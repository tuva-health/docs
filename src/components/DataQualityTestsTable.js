import React, { useEffect, useMemo, useState } from 'react';
import yaml from 'js-yaml';
import { DEFAULT_BRANCH } from './fetchModelColumns';

const RAW_BASE_URL = 'https://raw.githubusercontent.com/tuva-health/tuva';

function buildYamlUrl(relativePath, branch = DEFAULT_BRANCH) {
  if (!relativePath) {
    throw new Error('yamlPath must be provided');
  }

  const cleanedPath = relativePath.replace(/^\/+/, '');

  if (!cleanedPath.startsWith('models/')) {
    throw new Error('yamlPath must reside within the "models" directory');
  }

  return `${RAW_BASE_URL}/${branch}/${cleanedPath}`;
}

function cleanTableName(name = '') {
  return name.replace(/^input_layer__/, '');
}

function normalizeTest(testEntry) {
  if (!testEntry) {
    return null;
  }

  if (typeof testEntry === 'string') {
    return { name: testEntry };
  }

  const [[name, details]] = Object.entries(testEntry);
  if (!name) {
    return null;
  }

  const description =
    typeof details === 'object' && details
      ? details.description || details?.config?.description || ''
      : '';
  const severity =
    typeof details === 'object' && details?.config
      ? details.config.severity
      : undefined;

  return { name, description, severity };
}

async function fetchTestsForTable({ modelName, yamlPath, branch = DEFAULT_BRANCH }) {
  const url = buildYamlUrl(yamlPath, branch);
  const response = await fetch(url, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const parsed = yaml.load(await response.text());
  const modelEntry = parsed?.models?.find((entry) => entry.name === modelName);

  if (!modelEntry) {
    throw new Error(`Model "${modelName}" not found in ${yamlPath}`);
  }

  const rows = [];
  (modelEntry.columns || []).forEach((column) => {
    (column.tests || []).forEach((test) => {
      const normalized = normalizeTest(test);
      if (normalized) {
        rows.push({
          tableName: modelEntry.name,
          displayTableName: cleanTableName(modelEntry.name),
          columnName: column.name,
          testName: normalized.name,
          description: normalized.description || '',
          severity: normalized.severity || '',
        });
      }
    });
  });

  return rows;
}

export function DataQualityTestsTable({ tables = [] }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const tableKey = useMemo(
    () =>
      tables
        .map((table) => `${table.modelName}:${table.yamlPath}:${table.branch || ''}`)
        .join('|'),
    [tables],
  );

  useEffect(() => {
    if (!tables.length || !tableKey) {
      setRows([]);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const load = async () => {
      try {
        const all = [];
        for (const table of tables) {
          const tableRows = await fetchTestsForTable(table);
          all.push(...tableRows);
        }
        if (isMounted) {
          setRows(all);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setRows([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [tables, tableKey]);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) {
      return rows;
    }
    const lower = searchTerm.toLowerCase();
    return rows.filter(
      (row) =>
        row.displayTableName.toLowerCase().includes(lower) ||
        row.columnName.toLowerCase().includes(lower) ||
        row.testName.toLowerCase().includes(lower),
    );
  }, [rows, searchTerm]);

  if (error) {
    return <p role="alert">Unable to load data quality tests: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading data quality tests…</p>;
  }

  return (
    <div className="data-quality-tests-table">
      <p style={{ marginBottom: '8px' }}>
        <strong>Total Number of Data Quality Tests:</strong> {filteredRows.length}
      </p>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by table, column, or test"
        style={{
          marginBottom: '10px',
          width: '100%',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      />
      {filteredRows.length ? (
        <table>
          <thead>
            <tr>
              <th>Table Name</th>
              <th>Column Name</th>
              <th>Test</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr key={`${row.tableName}-${row.columnName}-${row.testName}-${index}`}>
                <td>{row.displayTableName}</td>
                <td>{row.columnName}</td>
                <td>{row.testName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tests were found for the selected filter.</p>
      )}
    </div>
  );
}

export default DataQualityTestsTable;
