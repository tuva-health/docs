import React, {useState, useEffect, useRef} from 'react';
import Papa from 'papaparse';
import $ from "jquery";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-scroller-dt';
import 'datatables.net-plugins/dataRender/ellipsis.mjs';
import DataTable from 'datatables.net-dt';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';




export function CSVDataTable({csvUrl}) {
    const [data, setData] = useState([]);
    const tableRef = useRef(null);

    const tableId = hashCode(csvUrl);

    useEffect(() => {
        const fetchData = async () => {
            try {
                Papa.parse(csvUrl, {
                    download: true,
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setData(results.data);
                        if(ExecutionEnvironment.canUseDOM){
                            $(document).ready(() => {
                                const myDataTable = $(tableRef.current).DataTable({
                                    responsive: true,
                                    paging: true,
                                    ordering: true,
                                    // buttons: [ 'copy', 'csv', 'excel' ],
                                    fixedHeader: {
                                         header: true,
                                    //     headerOffset: $('.navbar').outerHeight()
                                    },
                                });
                            });
                        }
              }
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
            <thead >
            <tr>
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
        </table></div>
    );
};

// export default CSVDataTable;


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
