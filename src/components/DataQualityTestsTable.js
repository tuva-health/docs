import React, { useEffect, useMemo, useState } from 'react';
import yaml from 'js-yaml';
import tablesList from '../data/dataQualityTables.json';
import { DEFAULT_BRANCH } from './fetchModelColumns';

const RAW_BASE_URL = 'https://raw.githubusercontent.com/tuva-health/tuva';
const GITHUB_BASE_URL = 'https://github.com/tuva-health/tuva/blob';

const yamlCache = new Map();

async function fetchYamlFile(yamlPath, branch = DEFAULT_BRANCH) {
  const cacheKey = `${branch}:${yamlPath}`;
  if (yamlCache.has(cacheKey)) {
    return yamlCache.get(cacheKey);
  }

  const url = `${RAW_BASE_URL}/${branch}/${yamlPath}`;
  const response = await fetch(url, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${yamlPath}: ${response.status}`);
  }

  const text = await response.text();
  yamlCache.set(cacheKey, text);
  return text;
}

function cleanTableName(name = '') {
  const parts = name.split('__');
  return parts.length > 1 ? parts.slice(1).join('__') : name;
}

function extractTestLineNumbers(fileContent) {
  const lines = fileContent.split('\n');
  const lineMap = {};
  let currentColumn = null;
  let inTests = false;
  let testsIndent = null;
  let testItemIndent = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const indentMatch = line.match(/\S/);
    const indent = indentMatch ? indentMatch.index : 0;

    if (trimmed.startsWith('- name:')) {
      const value = trimmed.split(':', 1)[1]?.trim() || null;
      currentColumn = value;
      inTests = false;
      testItemIndent = null;
      if (currentColumn && !lineMap[currentColumn]) {
        lineMap[currentColumn] = [];
      }
      return;
    }

    if (trimmed.startsWith('tests:') && currentColumn) {
      inTests = true;
      testsIndent = indent;
      testItemIndent = null;
      if (!lineMap[currentColumn]) {
        lineMap[currentColumn] = [];
      }
      return;
    }

    if (inTests && currentColumn) {
      if (!trimmed.length || trimmed.startsWith('#')) {
        return;
      }

      if (indent <= testsIndent) {
        inTests = false;
        testItemIndent = null;
        return;
      }

      if (trimmed.startsWith('- ')) {
        if (testItemIndent === null) {
          testItemIndent = indent;
        }
        if (indent === testItemIndent) {
          lineMap[currentColumn].push(index + 1);
        }
        return;
      }
    }
  });

  return lineMap;
}

export function DataQualityTestsTable() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadRows = async () => {
      try {
        const aggregated = [];

        for (const table of tablesList) {
          const { modelName, yamlPath, branch = DEFAULT_BRANCH } = table;
          if (!modelName || !yamlPath) {
            continue;
          }

          let fileContent;
          try {
            fileContent = await fetchYamlFile(yamlPath, branch);
          } catch (err) {
            console.error(`Failed to fetch ${yamlPath}`, err);
            continue;
          }

          let parsed;
          try {
            parsed = yaml.load(fileContent);
          } catch (err) {
            console.error(`Failed to parse ${yamlPath}`, err);
            continue;
          }

          const model = parsed?.models?.find((entry) => entry.name === modelName);
          if (!model) {
            continue;
          }

          const lineLookup = extractTestLineNumbers(fileContent);

          (model.columns || []).forEach((column) => {
            const columnName = column.name;
            const lineNumbers = lineLookup[columnName] || [];

            (column.tests || []).forEach((test, index) => {
              let testName = '';
              let description = '';
              let severity = '';

              if (typeof test === 'string') {
                testName = test;
              } else if (typeof test === 'object' && test !== null) {
                const [name, details] = Object.entries(test)[0];
                testName = name;
                description = details?.description || details?.config?.description || '';
                severity = details?.config?.severity || '';
              }

              aggregated.push({
                schemaName: modelName.split('__')[0] || 'Unknown',
                tableName: modelName,
                displayTableName: cleanTableName(modelName),
                columnName,
                testName: testName.replace(/^the_tuva_project\./, ''),
                description,
                severity,
                yamlPath,
                branch,
                lineNumber: lineNumbers[index] || lineNumbers[lineNumbers.length - 1] || null,
              });
            });
          });
        }

        if (isMounted) {
          setRows(aggregated);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRows();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) {
      return rows;
    }
    const lower = searchTerm.toLowerCase();
    return rows.filter(
      (row) =>
        (row.schemaName && row.schemaName.toLowerCase().includes(lower)) ||
        (row.displayTableName && row.displayTableName.toLowerCase().includes(lower)) ||
        (row.columnName && row.columnName.toLowerCase().includes(lower)) ||
        (row.testName && row.testName.toLowerCase().includes(lower)),
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
        placeholder="Search by schema, table, column, or test type"
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
              <th>Schema</th>
              <th>Table</th>
              <th>Column</th>
              <th>Test Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr key={`${row.tableName}-${row.columnName}-${row.testName}-${index}`}>
                <td>{row.schemaName}</td>
                <td>{row.displayTableName}</td>
                <td>{row.columnName}</td>
                <td>
                  <a
                    href={`${GITHUB_BASE_URL}/${row.branch || DEFAULT_BRANCH}/${row.yamlPath}${
                      row.lineNumber ? `#L${row.lineNumber}` : ''
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.testName}
                  </a>
                </td>
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
