import React, {useState, useEffect, useRef} from 'react';
import Papa from 'papaparse';
import $ from "jquery";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-scroller-dt';
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
    if (isClient()) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    Papa.parse(csvUrl, {
                        download: true,
                        header: true,
                        skipEmptyLines: true,
                        complete: (results) => {
                            setData(results.data);
                            $(document).ready(() => {
                                const myDataTable = $(tableRef.current).DataTable({
                                    responsive: true,
                                    // paging: true,
                                    ordering: true,
                                    // buttons: [ 'copy', 'csv', 'excel' ],
                                    fixedHeader: {
                                        header: true,
                                        headerOffset: $('.navbar').outerHeight()
                                    },

                                });
                                $(window).on('resize', function () {
                                    //     // Trigger responsive recalculation
                                    myDataTable.responsive.recalc();
                                    //
                                    //     // Trigger FixedHeader update
                                    myDataTable.fixedHeader.adjust();
                                });


                            });
                        }
                    });

                } catch (error) {
                    console.error(error);
                }


            };
            fetchData();
        }, [csvUrl]);
    }

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