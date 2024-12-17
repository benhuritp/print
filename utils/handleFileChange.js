"use client"
import { useData } from '@/context/DataContext';
import * as XLSX from 'xlsx';
import { xml2json } from 'xml-js';
const handleFileChange = async (e, setData) => {
  const file = e.target.files[0];

  // Check if a file is selected
  if (!file) {
    alert("No file selected");
    setData([]);
    return;
  }

  try {
    const fileType = file.type;
    if (fileType === 'application/xml' || fileType === 'text/xml') {
      const text = await file.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'application/xml');

      // Find table elements
      const table = xmlDoc.getElementsByTagName('table:table')[0]; // Assuming only one table
      const rows = Array.from(table.getElementsByTagName('table:table-row'));
      const tableData = rows.reduce((acc, row) => {
        const cells = Array.from(row.getElementsByTagName('table:table-cell'));
        const rowData = cells.map(cell => cell.textContent.trim()).filter(cell => cell !== '');
        if (rowData.length > 0) { // Skip rows that are empty after filtering
          acc.push(rowData);
        }
        return acc;
      }, []);

      // console.log(tableData);
      setData(tableData);
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Filter out empty rows
      const filteredExcelData = excelData.filter(row => {
        return Object.values(row).some(cell => cell !== undefined && cell !== '');
      });

      // console.log(filteredExcelData);
      setData(filteredExcelData);
    }
  } catch (error) {
    console.error("Error reading file:", error);
  }
};
export default handleFileChange;