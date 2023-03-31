import React, { useState, useEffect, useRef } from 'react';
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


export function JsonDataTable({ jsonPath, tableid }) {
  const [tableData, setTableData] = useState([]);
  const tableRef = useRef(null);

  const tableId = `table-${hashCode(jsonPath)}`;

  useEffect(() => {
    if (!isClient()) return;
    const fetchData = async () => {
      try {
        const responseMan = await fetch('https://raw.githubusercontent.com/tuva-health/the_tuva_project/main/docs/manifest.json');
        const responseCat = await fetch('https://raw.githubusercontent.com/tuva-health/the_tuva_project/main/docs/catalog.json');
        const jsonDataMan = await responseMan.json();
        const jsonDataCat = await responseCat.json();
        const data = parseJsonData(jsonDataMan, jsonDataCat, jsonPath);
        setTableData(data);

        const myDataTable = new DataTable(tableRef.current, {
          responsive: true,
          paging: false,
          ordering: false,
          columnDefs: [
            {
              targets: 0,
              render: DataTable.render.ellipsis(40),
            },
          ],
          fixedHeader: {
                header: true,
                // Replace the following line with a non-jQuery alternative for getting the navbar height
                headerOffset: document.querySelector('.navbar').offsetHeight
              },
        });

        // const myFixedHeader = new FixedHeader(myDataTable, {
        //   header: true,
        //   headerOffset: document.querySelector('.navbar').offsetHeight,
        //
        // });

        window.addEventListener('resize', () => {
          myDataTable.responsive.recalc();
          myDataTable.fixedHeader.adjust();
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [jsonPath]);

  return (
    <div>
      <table ref={tableRef} id={tableId} className="display" style={{ width: '100%' }}>
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
              <td>{row.terminology ? <a href={row.terminology}>yes</a> : 'no'}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JsonDataTable;
