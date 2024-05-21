import React, {useState, useEffect, useRef} from 'react';
import useStickyHeader from "./useStickyHeader.js";
import "./tableStyles.css";
import Table from 'react-bootstrap/Table';
import { tableHeaders, newTableData } from './Data.js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Form from 'react-bootstrap/Form';





function parseJsonData(jsonDataMan, jsonDataCat, jsonPath) {
  if ((jsonDataMan || jsonDataCat || jsonPath)!==undefined) {
    var pathSegments = jsonPath.split(/(?<!\\)\./);
    var dataMan = pathSegments.reduce((acc, path) => {
        var unescapedPath = path.replace(/\\\./g, '.');
        return acc[unescapedPath];
    }, jsonDataMan);
    var dataCat = pathSegments.reduce((acc, path) => {
        var unescapedPath = path.replace(/\\\./g, '.');
        return acc[unescapedPath];
    }, jsonDataCat);
    var parsedDataCat = Object.entries(dataCat).map(([key, value]) => ({
        name: key,
        type: value.type,
        index: value.index
    }));
    var parsedDataMan = Object.entries(dataMan).map(([key, value]) => {
        var result = {
            name: key,
            description: value.description,
            data_type: value.data_type
        };
        if (value.meta && value.meta.terminology) {
            result.terminology = value.meta.terminology;
        };
        if (value.meta && value.meta.terminology_note) {
            result.terminology_note = value.meta.terminology_note;
        }
        return result;
  
    });
    var parsedData = [];
    for (let i = 0; i < parsedDataCat.length; i++) {
        var pth = parsedDataCat[i].name.toLowerCase();
        var manObj = parsedDataMan.find((obj) => obj.name && obj.name.toLowerCase() == pth)
        parsedData[i] = {
            name: manObj ? manObj.name : parsedDataCat[i].name,
            type: manObj && manObj.data_type ? manObj.data_type : ( ( parsedDataCat[i].type === "TEXT") ? "varchar" : parsedDataCat[i].type.toLowerCase() ),
            description: manObj ? manObj.description : undefined,
            terminology: manObj && manObj.terminology ? manObj.terminology : undefined,
            terminology_note: manObj && manObj.terminology_note ? manObj.terminology_note : undefined
        }
    }
    ;
    return parsedData;
  }
}

function hashCode(str) {
  var hash = 0;
  if (str === undefined) {
    if (str.length == 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  
}
function renderHeader() {
  if (tableHeaders !== undefined) {
    return (
      <thead>
        <tr>
          {tableHeaders.map((item) => (
            <th style={{ minWidth: item==='Description'?'235px': '195px', maxWidth: item==='Description'?'235px': '195px' }} key={item}>{item}</th>
          ))}
        </tr>
      </thead>
    );
  }
  }


export function JsonDataTable({ jsonPath }) {
  const [tableData, setTableData] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");

  // Initialize sticky header hook unconditionally
  const { tableRef, isSticky } = useStickyHeader();

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const fetchData = async () => {
        try {
          const responseMan = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/add_new_terminologies/docs/manifest.json");
          const responseCat = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/add_new_terminologies/docs/catalog.json");
          const jsonDataMan = await responseMan.json();
          const jsonDataCat = await responseCat.json();
          const data = parseJsonData(jsonDataMan, jsonDataCat, jsonPath);
          if (data !== undefined) {
            setTableData(data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();

      // Set background color based on the current theme
      const updateTableBackgroundColor = () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const stickyTable = document.querySelector('.sticky.table');
        if (stickyTable) {
          if (theme === 'dark') {
            stickyTable.style.backgroundColor = '#333';
          } else {
            stickyTable.style.backgroundColor = 'white';
          }
        }
      };

      // Update background color on theme change
      const observer = new MutationObserver(updateTableBackgroundColor);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

      // Initial update
      updateTableBackgroundColor();

      // Cleanup observer on unmount
      return () => observer.disconnect();
    }
  }, [jsonPath]);

  return (
    <div className="table-container">
      {isSticky && (
        <Table responsive
          className="sticky"
          style={{
            position: "fixed",
            top: 55,
            width: '100%', // Ensure it covers the full width
          }}
        >
          {renderHeader()}
        </Table>
      )}
      <Form.Control onChange={(e) => setSearchedVal(e.target.value)} size='lg' type='text' placeholder='Search' style={{ width: '100%', padding: '15px', borderRadius: '10px', border: "1px solid gray" }} />
      <Table responsive ref={tableRef} className="display">
        {renderHeader()}
        <tbody>
          {tableData
            .filter((row) =>
              !searchedVal.length || row.name.toString()
                .toString()
                .toLowerCase()
                .includes(searchedVal.toString().toLowerCase())
            )
            .map((row, index) => (
              <tr key={index}>
                <td style={{ minWidth: '195px', maxWidth: '195px' }}>{row.name}</td>
                <td style={{ minWidth: '195px', maxWidth: '195px' }}>{row.type}</td>
                <td style={{ minWidth: '235px', maxWidth: '235px' }}>{row.description}</td>
                <td style={{ minWidth: '195px', maxWidth: '195px' }}>{row.terminology ? <a href={row.terminology}>yes</a> : "no"} {row.terminology_note ? <span style={{ display: 'inline', fontSize: '75%', fontWeight: 'bold', lineHeight: '0' }}>{row.terminology_note}</span> : ""}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default JsonDataTable;