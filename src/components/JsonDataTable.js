import React, {useState, useEffect, useRef} from 'react';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import 'datatables.net-dt/js/dataTables.dataTables.min.js';
// import 'datatables.net-fixedheader-dt';
// import 'datatables.net-responsive-dt';
// import 'datatables.net-scroller-dt';
// import 'datatables.net-plugins/dataRender/ellipsis.mjs';
// import DataTable from "datatables.net-dt";
import useStickyHeader from "./useStickyHeader.js";
import "./tableStyles.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { tableHeaders, newTableData } from './Data.js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';



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
            <th style={{ width: '27.5%' }} key={item}>{item}</th>
          ))}
        </tr>
      </thead>
    );
  }
  }


export function JsonDataTable({jsonPath}) {
    var [tableData, setTableData] = useState([]);
    var { tableRef, isSticky } = useState(null);

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
          <Table responsive ref={tableRef} id={tableId} className="display" >
              {renderHeader()}
              <tbody>
              {tableData.map((row, index) => (
                  <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.type}</td>
                      <td>{row.description}</td>
                      <td>{row.terminology ? <a href={row.terminology}>yes</a> : "no"}</td>
                  </tr>
              ))}
              </tbody>
          </Table>
      </div>
  );
}