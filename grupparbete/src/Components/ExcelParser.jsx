import React, { useState } from "react";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";


ModuleRegistry.registerModules([AllCommunityModule]);


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ExcelParser = ({ file }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  React.useEffect(() => {
    if (!file) return;

    console.log("📂 Fil mottagen i ExcelParser:", file);

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("📥 reader.onload körs!");
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log("📊 Data parsad från fil:", jsonData);

      if (jsonData.length > 0) {
        const headers = jsonData[0];
        const rows = jsonData.slice(1).map((row) =>
          headers.reduce((acc, header, i) => {
            acc[header] = row[i] || "";
            return acc;
          }, {})
        );

        setColumnDefs(headers.map((h) => ({ field: h }))); 
        setRowData(rows);
      }
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: "100%", margin: "auto" }}
    >
      <AgGridReact
        theme="legacy" 
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
      />
    </div>
  );
};

export default ExcelParser;
