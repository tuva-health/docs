import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import './tableStyles.css'; // Import your existing CSS file

function ExpandableTable({ dataSourceUrl }) {
    const [data, setData] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);  // State to track expanded row
    const [searchInput, setSearchInput] = useState('');  // State for the search input

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(dataSourceUrl);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [dataSourceUrl]);

    const columns = useMemo(() => [
        {
            Header: 'Concept Name',
            accessor: 'concept_name',
            className: 'fixed-column' // Add a class for the first column
        },
        {
            Header: 'Concept Type',
            accessor: 'concept_type',
            className: 'expandable-column' // Add a class for the second column
        }
    ], []);

    const filteredData = useMemo(() => {
        const lowercasedFilter = searchInput.toLowerCase();
        return data.filter(row =>
            Object.keys(row).some(key =>
                String(row[key]).toLowerCase().includes(lowercasedFilter)
            )
        );
    }, [data, searchInput]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: filteredData });

    const toggleRow = (index) => {
        // Toggle expand/collapse
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <>
            <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search..."
                style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
            />
            <table {...getTableProps()} className="custom-expandable-table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className={column.className}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={index}>
                                <tr {...row.getRowProps()} onClick={() => toggleRow(index)}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className={cell.column.className}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                                {expandedRow === index && (
                                    <tr>
                                        <td colSpan={columns.length}>
                                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                                {row.original.concept_scope}
                                            </pre>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ExpandableTable;
