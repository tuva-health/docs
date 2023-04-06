import React, { useState, useEffect, useRef } from 'react';


export function JsonTableScroll({  jsonPath, tableHeight = "600"  }) {
  const [tableData, setTableData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const responseMan = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/main/docs/manifest.json");
        // const responseCat = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/main/docs/catalog.json");
        const responseMan = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/terminology_test/docs/manifest.json");
        const responseCat = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/terminology_test/docs/catalog.json");
        // console.log('ResponseMan: ', responseMan)
        // console.log('ResponseCat: ', responseCat)
        const jsonDataMan = await responseMan.json();
        const jsonDataCat = await responseCat.json();
        // console.log('jsonDataMan: ', jsonDataMan)
        // console.log('jsonDataCat: ', jsonDataCat)
        const data = parseJsonData(jsonDataMan,jsonDataCat, jsonPath);
        // console.log('data: ', data)
        setTableData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [ jsonPath]);



useEffect(() => {
  const table = tableRef.current;
  const header = table.querySelector('thead');
  const body = table.querySelector('tbody');

  const setWidths = () => {
    const headerCells = header.querySelectorAll('th');
    const bodyCells = body.querySelectorAll('td');

    for (let i = 0; i < headerCells.length; i++) {
      const headerWidth = headerCells[i].offsetWidth;
      const bodyWidth = bodyCells[i].offsetWidth;
      const maxWidth = Math.max(headerWidth, bodyWidth);

      headerCells[i].style.width = `${maxWidth}px`;
      bodyCells[i].style.width = `${maxWidth}px`;
    }
  };

  setTimeout(() => {
    setWidths();
    window.addEventListener('resize', setWidths);

    return () => {
      window.removeEventListener('resize', setWidths);
    };
  }, 50);
}, [tableData]);


  const tableDivStyle = {
    height: `${tableHeight}px`,
    overflowY: 'scroll'
  };

  const tableStyle = {
    position: 'relative',
    borderCollapse: 'collapse'
  };

  const headerStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    marginRight: `${window.innerWidth - document.documentElement.clientWidth}px`
  };
  const thStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white'
  };



  return (
      <table ref={tableRef} style={tableStyle}>
      <thead style={headerStyle}>
        <tr>
          <th >Column</th>
          <th >Data Type</th>
          <th >Terminology</th>
          <th >Description</th>
        </tr>
      </thead>
      <div style={tableDivStyle}>
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
    </div>
    </table>
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
