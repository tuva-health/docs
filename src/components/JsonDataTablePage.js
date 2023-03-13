import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import DataTable from 'datatables.net-dt';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-scroller-dt';
export function JsonDataTablePage({ jsonPath }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMan = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/terminology_test/docs/manifest.json");
        const responseCat = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/terminology_test/docs/catalog.json");
        const jsonDataMan = await responseMan.json();
        const jsonDataCat = await responseCat.json();
        const data = parseJsonData(jsonDataMan,jsonDataCat, jsonPath);
        setTableData(data);
        // Initialize DataTables plugin after data has been set
        $(document).ready(() => {
          $('#myTable').DataTable({
            responsive: true,
            ordering: false,
            scrollY: "400px",
            scrollCollapse: true
          });
        });
        console.log('NavbarHeight: ',$('.navbar').outerHeight())
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [jsonPath]);

  return (
    <div>
      <table id="myTable" className="display">
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


function parseJsonData(jsonDataMan,jsonDataCat, jsonPath) {
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
    description: value.description
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
      type: parsedDataCat[i].type,
      description: manObj ? manObj.description : undefined,
      terminology: manObj && manObj.terminology ? manObj.terminology : undefined
    }
  };
  console.log('ParsedData:',parsedData);
  console.log('lengthMan:',parsedDataMan.length)
  console.log('lengthCat:',parsedDataCat.length)
  return parsedData;
}

