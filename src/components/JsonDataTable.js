import React, {useState, useEffect, useRef} from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-scroller-dt';
import 'datatables.net-plugins/dataRender/ellipsis.mjs';
import DataTable from "datatables.net-dt";

export function JsonDataTable({jsonPath, tableid}) {
    const [tableData, setTableData] = useState([]);
    const tableRef = useRef(null);

    const tableId = `table-${hashCode(jsonPath)}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseMan = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/terminology_test/docs/manifest.json");
                const responseCat = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/terminology_test/docs/catalog.json");
                const jsonDataMan = await responseMan.json();
                const jsonDataCat = await responseCat.json();
                const data = parseJsonData(jsonDataMan, jsonDataCat, jsonPath);
                setTableData(data);
                // Initialize DataTables plugin after data has been set
                $(document).ready(() => {
                    const myDataTable = $(tableRef.current).DataTable({
                        responsive: true,
                        paging: false,
                        ordering: false,
                        // fixedHeader: {
                        //     header: true,
                        //     headerOffset: $('.navbar').outerHeight()
                        // },

                        columnDefs: [{
                            "targets": 0,
                            render: DataTable.render.ellipsis( 40 )
                            // width: '10%'
                        }]


                        //   "columns": [
                        //     { "width": "20px" },
                        //     null,
                        //     null,
                        //     null
                        //   ]
                    });

         const myFixedHeader = new $.fn.dataTable.FixedHeader(myDataTable, {
            header: true,
            headerOffset: $(".navbar").outerHeight(),
          });



                    //// return myDataTable
                    $(window).on('resize', function () {
                        // Trigger responsive recalculation
                        $(`#${tableId}`).DataTable().responsive.recalc();

                        // Trigger FixedHeader update
                    myFixedHeader.update();
                    });


                    // Add the sidebar toggle event listener
                    // $('.navbar__toggle').on('click', function () {
                    //     // Use setTimeout to delay the adjustment slightly,
                    //     // allowing the sidebar to finish its collapsing/expanding animation
                    //     setTimeout(function () {
                    //         // Trigger responsive recalculation
                    //         myDataTable.responsive.recalc();

                    //         // Trigger FixedHeader update
                    //         myDataTable.fixedHeader.adjust();
                    //     }, 250); // Adjust the delay time as needed
                    // });

                });
                // console.log('NavbarHeight: ', $('.navbar').outerHeight())
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
     return () => {
      // Dispose of DataTables and FixedHeader instances
      myFixedHeader.destroy();
      myDataTable.destroy();
    };
    }, [jsonPath]);

    return (
        <div>
            <table ref={tableRef} id={tableId} className="display"  style={{width: `100%`}}>
                <thead>
                <tr>
                    <th>Column</th>
                    <th>Data Type</th>
                    <th>Terminology</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.type}</td>
                        <td>{row.terminology ? <a href={row.terminology}>yes</a> : "no"}</td>
                        <td>{row.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


function parseJsonData(jsonDataMan, jsonDataCat, jsonPath) {
    const pathSegments = jsonPath.split(/(?<!\\)\./);
    const dataMan = pathSegments.reduce((acc, path) => {
        const unescapedPath = path.replace(/\\\./g, '.');
        return acc[unescapedPath];
    }, jsonDataMan);
    const dataCat = pathSegments.reduce((acc, path) => {
        const unescapedPath = path.replace(/\\\./g, '.');
        return acc[unescapedPath];
    }, jsonDataCat);
    const parsedDataCat = Object.entries(dataCat).map(([key, value]) => ({
        name: key,
        type: value.type,
        index: value.index
    }));
    // console.log('ParsedDataCat:',parsedDataCat);
    const parsedDataMan = Object.entries(dataMan).map(([key, value]) => {

        const result = {
            name: key,
            description: value.description,
            data_type: value.data_type
        };

        if (value.meta && value.meta.terminology) {
            result.terminology = value.meta.terminology;
        }

        // if (value.data_type) { result.data_type = value.data_type}

        return result;

    });
    // console.log('ParsedDataMan:',parsedDataMan);
    const parsedData = [];
    for (let i = 0; i < parsedDataCat.length; i++) {
        const pth = parsedDataCat[i].name.toLowerCase();
        // console.log('name: ',pth)
        const manObj = parsedDataMan.find((obj) => obj.name && obj.name.toLowerCase() == pth)
        // console.log('catObj: ',catObj)
        parsedData[i] = {
            name: manObj ? manObj.name : parsedDataCat[i].name,
            type: manObj && manObj.data_type ? manObj.data_type : ( ( parsedDataCat[i].type === "TEXT") ? "varchar" : parsedDataCat[i].type.toLowerCase() ),
            description: manObj ? manObj.description : undefined,
            terminology: manObj && manObj.terminology ? manObj.terminology : undefined
        }
    }
    ;
    // console.log('ParsedData:', parsedData);
    // console.log('lengthMan:', parsedDataMan.length)
    // console.log('lengthCat:', parsedDataCat.length)
    return parsedData;
}

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