import React, {useState, useEffect, useRef} from 'react';
import Papa from 'papaparse';
import useStickyHeader from "./useStickyHeader.js";
import "./tableStyles.css";
import Table from 'react-bootstrap/Table';
import { tableHeaders, csvTableHeaders } from './Data.js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Form from 'react-bootstrap/Form';



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

function renderHeader() {
if (tableHeaders !== undefined) {
    return (
    <thead>
        <tr>
        {csvTableHeaders.map((item) => (
        <th style={{ minWidth: '150px', maxWidth: '150px' }} key={item}>{item}
        </th>
        ))}
        </tr>
    </thead>
    );
}
}

export function CSVDataTableCatalog({csvUrl}) {
    var [tableData, setTableData] = useState([]);
    var { tableRef, isSticky } = useState(null);
    var [searchedVal, setSearchedVal] = useState("");
    var [data, setData] = useState([]);
    var tableId = hashCode(csvUrl);

    if (ExecutionEnvironment.canUseDOM){
        var { tableRef, isSticky } = useStickyHeader();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                Papa.parse(csvUrl, {
                    download: true,
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setData(results.data);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [csvUrl]);

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
          {/* <Form.Control onChange={(e) => setSearchedVal(e.target.value)} size='lg' type='text' placeholder='Search' style={{width:'100%', padding:'15px', borderRadius:'10px', border: "1px solid gray"}} /> */}
          <Table responsive ref={tableRef} id={tableId} className="display" >
            {renderHeader()}
              <tbody>
              {data.filter((row) => 
                row[Object.keys(row)[0]].toLowerCase().includes(searchedVal.toLowerCase()) ||
              row[Object.keys(row)[2]]).map((row, i) =>
               (
                <tr key={i} >
                    {Object.entries(row).filter(([, value], index) => index !== 3).map(([key, value], j) => (
                        <td style={{ minWidth: '300px', maxWidth: '300px'}} key={j}>{j === 0 ? <a href={row[Object.keys(row)[3]]}>{value}</a> : value}</td>
                    ))}
                </tr>
            ))}
              </tbody>
          </Table>
      </div>
);
};

// export default CSVDataTable;


