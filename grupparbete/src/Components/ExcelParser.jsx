import React, { useState } from "react";
import * as XLSX from "xlsx";
// import { AgGridReact } from "ag-grid-react";
// import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import EditableTable from "./EditableTable";

// ModuleRegistry.registerModules([AllCommunityModule]);

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

const ExcelParser = ({ file }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  // const [tableHeight, setTableHeight] = useState(400);
  // const [tableWidth, setTableWidth] = useState(800); // pixels instead of percentage
  // const [isResizing, setIsResizing] = useState(false);

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

        // Make headers unique by adding a counter for duplicates
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
        console.log("✅ Parsed data:", { headers: uniqueHeaders, rows });
      }
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  // // Handle mouse down on resize handle
  // const handleMouseDown = (e) => {
  //   e.preventDefault();
  //   setIsResizing(true);
  // };

  // // Handle mouse move for resizing
  // React.useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     if (!isResizing) return;

  //     const container = document.getElementById("table-container");
  //     if (!container) return;

  //     const rect = container.getBoundingClientRect();
  //     const newHeight = e.clientY - rect.top;
  //     const newWidth = e.clientX - rect.left;

  //     if (newHeight > 200) setTableHeight(newHeight);
  //     if (newWidth > 300) setTableWidth(newWidth); // Use pixels directly
  //   };

  //   const handleMouseUp = () => {
  //     setIsResizing(false);
  //   };

  //   if (isResizing) {
  //     document.addEventListener("mousemove", handleMouseMove);
  //     document.addEventListener("mouseup", handleMouseUp);
  //   }

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [isResizing]);

  // return (
  //   <>
  //     <div
  //       id="table-container"
  //       className="ag-theme-alpine"
  //       style={{
  //         height: tableHeight,
  //         width: tableWidth, // Use pixels directly
  //         margin: "auto",
  //         position: "relative",
  //         border: "3px solid #4a7c59",
  //         borderRadius: "16px",
  //         overflow: "hidden",
  //         maxWidth: "95vw", // Prevent overflow beyond viewport
  //         boxShadow:
  //           "0 8px 16px rgba(74, 124, 89, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
  //       }}
  //     >
  //       <AgGridReact
  //         theme="legacy"
  //         rowData={rowData}
  //         columnDefs={columnDefs}
  //         defaultColDef={{
  //           sortable: true,
  //           filter: true,
  //           resizable: true,
  //           editable: true,
  //         }}
  //         onCellValueChanged={(params) => {
  //           console.log(
  //             "✏️ Cell edited:",
  //             params.colDef.field,
  //             "=",
  //             params.newValue
  //           );
  //         }}
  //       />
  //       {/* Resize handle */}
  //       <div
  //         onMouseDown={handleMouseDown}
  //         style={{
  //           position: "absolute",
  //           bottom: 0,
  //           right: 0,
  //           width: "20px",
  //           height: "20px",
  //           cursor: "nwse-resize",
  //           backgroundColor: "#4a7c59",
  //           borderTopLeftRadius: "4px",
  //           opacity: 0.7,
  //           transition: "opacity 0.2s",
  //         }}
  //         onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
  //         onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
  //         title="Dra för att ändra storlek"
  //       >
  //         <div
  //           style={{
  //             position: "absolute",
  //             bottom: "2px",
  //             right: "2px",
  //             fontSize: "14px",
  //             color: "#fff",
  //             userSelect: "none",
  //           }}
  //         ></div>
  //       </div>
  //     </div>
  //     {/* Resize text - utanför containern */}
  //     <div
  //       style={{
  //         textAlign: "right",
  //         fontSize: "12px",
  //         color: "#4a7c59",
  //         fontWeight: "600",
  //         marginTop: "5px",
  //         marginRight: "auto",
  //         marginLeft: "auto",
  //         maxWidth: "95vw",
  //         width: tableWidth,
  //       }}
  //     >
  //       Ändra Storlek
  //     </div>
  //   </>
  // );

  return <EditableTable rowData={rowData} columnDefs={columnDefs} />;
};

export default ExcelParser;
