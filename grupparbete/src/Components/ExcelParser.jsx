import React, { useState } from "react";
import * as XLSX from "xlsx";
import EditableTable from "./EditableTable";

const ExcelParser = ({ file }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  React.useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 0) {
        const headers = jsonData[0];

        const uniqueHeaders = headers.map((header, index) => {
          const count = headers
            .slice(0, index)
            .filter((h) => h === header).length;
          return count > 0 ? `${header}_${count + 1}` : header;
        });

        const rows = jsonData.slice(1).map((row) =>
          uniqueHeaders.reduce((acc, header, i) => {
            acc[header] = row[i] || "";
            return acc;
          }, {})
        );

        setColumnDefs(uniqueHeaders.map((h) => ({ field: h, editable: true })));
        setRowData(rows);
      }
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  return <EditableTable rowData={rowData} columnDefs={columnDefs} />;
};

export default ExcelParser;
