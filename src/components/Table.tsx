import React from 'react';

interface TableProps {
    jsonData: any[];
}

const Reacttable: React.FC<TableProps> = ({ jsonData }) => {
    if (jsonData.length === 0) {
        return <div>No data available</div>;
    }
    const filteredData = jsonData.filter(item => !item.includes('DESCRIPTION'));
    const fpkmdata = filteredData.filter(item => !item.includes('SYMBOL'));
    const tableHeaders = Object.keys(filteredData[0]);
    const convertToCSV = (objArray: any) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';

            for (const index in array[i]) {
                if (line !== '') line += ',';
                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    };

    const downloadCSV = () => {
        const csv = convertToCSV(fpkmdata);
        const csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        const fileName = filteredData[0][1] ? filteredData[0][1] + '_data.csv' : 'table_data.csv';
        const link = document.createElement('a');
        link.href = csvData;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const headings = ['Sample time points', 'FPKM values'];
    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
        <table style={{border: '1px solid black'}}>
            <thead>
                <tr>
                    {headings.map((header, index) => (
                        <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                        ))}
                </tr>
            </thead>
            <tbody>
                {fpkmdata.map((row, index) => (
                    <tr key={index}>
                        {tableHeaders.map(header => (
                            <td key={header + row[header]} style={{ border: '1px solid black' }}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            <button onClick={downloadCSV}>Download as CSV</button></div>
        </div>
    );
};

export default Reacttable;