import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

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
        },
        {
            Header: 'Concept Type',
            accessor: 'concept_type',
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
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                                {expandedRow === index && (
                                    <tr>
                                        <td colSpan={columns.length}>
                                            {row.original.concept_scope}
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
