import React, {useState, useEffect, useRef} from 'react';
import useStickyHeader from "./useStickyHeader.js";
import "./tableStyles.css";
import Table from 'react-bootstrap/Table';
import { tableHeaders, newTableData } from './Data.js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useTable } from 'react-table';
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
            terminology: manObj && manObj.terminology ? manObj.terminology : undefined
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


export function JsonDataTable({jsonPath}) {
    var [tableData, setTableData] = useState([]);
    var { tableRef, isSticky } = useState(null);
    var [searchedVal, setSearchedVal] = useState("");


    if (ExecutionEnvironment.canUseDOM){
      var { tableRef, isSticky } = useStickyHeader();
      console.log("ExecutionEnvironment.canUseDOM is true");
    }
    var tableId = hashCode(jsonPath);

    useEffect(() => {
        var fetchData = async () => {
            try {
                var responseMan = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/main/docs/manifest.json");
                var responseCat = await fetch("https://raw.githubusercontent.com/tuva-health/the_tuva_project/main/docs/catalog.json");
                var jsonDataMan = await responseMan.json();
                var jsonDataCat = await responseCat.json();
                var data = parseJsonData(jsonDataMan, jsonDataCat, jsonPath);
                if (data !== undefined)
                {
                  setTableData(data);
                }
              } catch (error) {
                  console.error(error);
              }
            };
        fetchData();
          return () => {
          
          };
        }, [jsonPath, tableRef]);
  useEffect(() => {
    console.log("TESTING");
    console.log(tableRef);
    console.log(tableHeaders);
  })
  

  return (
      <div>
          {isSticky && (
                <Table responsive
                  className="sticky"
                  style={{
                    position: "fixed",
                    top: 55,
                    backgroundColor: "white",
                  }}
                >
                  {renderHeader()}
                </Table>
              )}
          <Form.Control onChange={(e) => setSearchedVal(e.target.value)} size='lg' type='text' placeholder='Search' style={{width:'100%', padding:'15px', borderRadius:'10px', border: "1px solid gray"}} />
          <Table responsive ref={tableRef} id={tableId} className="display" >
              {renderHeader()}
              <tbody>
              { tableData
              .filter((row) => 
                !searchedVal.length || row.name.toString()
                .toString()
                .toLowerCase()
                .includes(searchedVal.toString().toLowerCase()) 
              )
                .map((row, index) => (
                  <tr key={index}>
                      <td style={{ minWidth: '195px', maxWidth: '195px'}}>{row.name}</td>
                      <td style={{ minWidth: '195px', maxWidth: '195px'}}>{row.type}</td>
                      <td style={{ minWidth: '235px', maxWidth: '235px'}}>{row.description}</td>
                      <td style={{ minWidth: '195px', maxWidth: '195px'}}>{row.terminology ? <a href={row.terminology}>yes</a> : "no"}</td>
                  </tr>
              ))}
              </tbody>
          </Table>
      </div>
  );
}