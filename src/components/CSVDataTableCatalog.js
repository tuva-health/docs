import React, {useState, useEffect, useRef} from 'react';
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

export function CSVDataTableCatalog({csvUrl}) {
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

            const dataTableOptions = {
              responsive: true,
              ordering: true,
              fixedHeader: {
                header: true,
                // Replace the following line with a non-jQuery alternative for getting the navbar height
                headerOffset: document.querySelector('.navbar').offsetHeight
              },
            };

            const myDataTable = DataTable(tableRef.current, dataTableOptions);

            // Replace the following line with a non-jQuery alternative for handling window resize events
            window.addEventListener('resize', () => {
              myDataTable.responsive.recalc();
              myDataTable.fixedHeader.adjust();
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
    <div style={{width: '100%'}}>
        <table ref={tableRef} id={tableId} className="display" style={{width: '100%'}}>
            <thead style={{width: '100%'}}>
            <tr style={{width: '100%'}}>
                {data[0] && Object.keys(data[0]).filter((key, index) => index !== 5).map((key) => (
                    <th key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.filter(row => row[Object.keys(row)[5]]).map((row, i) => (
                <tr key={i}>
                    {Object.entries(row).filter(([, value], index) => index !== 5).map(([key, value], j) => (
                        <td key={j}>{j === 1 ? <a href={row[Object.keys(row)[5]]}>{value}</a> : value}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
 );
};


export default CSVDataTableCatalog;