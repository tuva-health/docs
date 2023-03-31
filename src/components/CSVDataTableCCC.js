import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import DataTable from 'datatables.net';
import FixedHeader from 'datatables.net-fixedheader';
import Responsive from 'datatables.net-responsive';
import Scroller from 'datatables.net-scroller';
import 'datatables.net-plugins/dataRender/ellipsis.mjs';

function hashCode(str) {
  let hash = 0;
  if (str.length == 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function isClient() {
  return typeof window !== 'undefined';
}

export function CSVDataTableCCC({ csvUrl }) {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  const tableId = `table-${hashCode(csvUrl)}`;

  useEffect(() => {
    if (!isClient()) return;
    const fetchData = async () => {
      try {
        Papa.parse(csvUrl, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            const myDataTable = new DataTable(tableRef.current, {
              responsive: {
                details: {
                  type: 'column',
                  target: 'tr',
                },
              },
              paging: true,
              ordering: true,
              columnDefs: [
                { responsivePriority: 100, targets: 0 },
                { responsivePriority: 2, targets: 1 },
                { responsivePriority: 6, targets: 2 },
                { responsivePriority: 3, targets: 3 },
                { responsivePriority: 4, targets: 4 },
                { responsivePriority: 102, targets: 5 },
                { responsivePriority: 103, targets: 6 },
                { responsivePriority: 104, targets: 7 },
                { responsivePriority: 105, targets: 8 },
                { responsivePriority: 1, targets: 9 },
              ],
            });

            window.addEventListener('resize', () => {
              myDataTable.responsive.recalc();
            });
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [csvUrl]);

  return (
    <div style={{ width: '100%' }}>
      <table ref={tableRef} id={tableId} className="display" style={{ width: '100%' }}>
        <thead style={{ width: '100%' }}>
          <tr style={{ width: '100%' }}>
            {data[0] && Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((value, j) => (
                <td key={j}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CSVDataTableCCC;
