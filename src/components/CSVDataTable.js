import React, {useState, useEffect, useRef} from 'react';
import Papa from 'papaparse';
import $ from "jquery";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-scroller-dt';
import 'datatables.net-plugins/dataRender/ellipsis.mjs';
import DataTable from "datatables.net-dt";



export function CSVDataTable({csvUrl}) {
    const [data, setData] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                Papa.parse(csvUrl, {
                    download: true,
                    header: true,
                    complete: (results) => {
                        setData(results.data);
                    }
                });
                $(document).ready(() => {
                    const myDataTable = $(tableRef.current).DataTable({
                        responsive: true,
                        paging: true,
                        ordering: true,
                        // fixedHeader: {
                        //     header: true,
                        //     headerOffset: $('.navbar').outerHeight()
                        // },
                        //   "columns": [
                        //     { "width": "20px" },
                        //     null,
                        //     null,
                        //     null
                        //   ]
                    });
                    $(window).on('resize', function () {
                    //     // Trigger responsive recalculation
                        myDataTable.responsive.recalc();
                    //
                    //     // Trigger FixedHeader update
                        myDataTable.fixedHeader.adjust();
                    });


                    // Add the sidebar toggle event listener
                    // $('.navbar__toggle').on('click', function () {
                    //     // Use setTimeout to delay the adjustment slightly,
                    //     // allowing the sidebar to finish its collapsing/expanding animation
                    //     setTimeout(function () {
                    //         // Trigger responsive recalculation
                    //         myDataTable.responsive.recalc();
                    //
                    //         // Trigger FixedHeader update
                    //         myDataTable.fixedHeader.adjust();
                    //     }, 250); // Adjust the delay time as needed
                });

                // });
                // console.log('NavbarHeight: ', $('.navbar').outerHeight())
            } catch (error) {
                console.error(error);
            }


        };
        fetchData();
    }, [csvUrl]);

    // useEffect(() => {
    //   const table = tableRef.current;
    //   const header = table.querySelector('thead');
    //   const body = table.querySelector('tbody');
    //
    //   const setWidths = () => {
    //     const headerCells = header.querySelectorAll('th');
    //     const bodyCells = body.querySelectorAll('td');
    //
    //     for (let i = 0; i < headerCells.length; i++) {
    //       const headerWidth = headerCells[i].offsetWidth;
    //       const bodyWidth = bodyCells[i].offsetWidth;
    //       const maxWidth = Math.max(headerWidth, bodyWidth);
    //
    //       headerCells[i].style.width = `${maxWidth}px`;
    //       bodyCells[i].style.width = `${maxWidth}px`;
    //     }
    //   };
    //
    //   setWidths();
    //   window.addEventListener('resize', setWidths);
    //
    //   return () => {
    //     window.removeEventListener('resize', setWidths);
    //   };
    // }, [data]);

    // const tableDivStyle = {
    //   height: `600px`,
    //   overflowY: 'scroll'
    // };
    //
    // const tableStyle = {
    //   position: 'relative',
    //   borderCollapse: 'collapse'
    // };
    //
    // const headerStyle = {
    //   position: 'sticky',
    //   top: 0,
    //   backgroundColor: 'white'
    // };
    // const thStyle = {
    //   position: 'sticky',
    //   top: 0,
    //   backgroundColor: 'white'
    // };
    return (

        <table ref={tableRef} id="DataTable" className="display" style={{width: `100%`}}>
            <thead>
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
        </table>
    );
};

// export default CSVDataTable;
