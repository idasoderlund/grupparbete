import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import ExportPDF from "./ExportPDF";

ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EditableTable = ({ rowData, columnDefs }) => {
  console.log("📥 EditableTable props:", { rowData, columnDefs });
  const gridRef = useRef(null);

  const [tableHeight, setTableHeight] = useState(400);
  const [tableWidth, setTableWidth] = useState(800); // pixels instead of percentage
  const [isResizing, setIsResizing] = useState(false);

  // Handle mouse down on resize handle
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  // Handle mouse move for resizing
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const container = document.getElementById("table-container");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const newHeight = e.clientY - rect.top;
      const newWidth = e.clientX - rect.left;

      if (newHeight > 200) setTableHeight(newHeight);
      if (newWidth > 300) setTableWidth(newWidth); // Use pixels directly
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <>
      <div
        id="table-container"
        className="ag-theme-alpine"
        style={{
          height: tableHeight,
          width: tableWidth, // Use pixels directly
          margin: "auto",
          position: "relative",
          border: "3px solid #4a7c59",
          borderRadius: "16px",
          overflow: "hidden",
          maxWidth: "95vw", // Prevent overflow beyond viewport
          boxShadow:
            "0 8px 16px rgba(74, 124, 89, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AgGridReact
          theme="legacy"
          ref={gridRef} //skickar datan i tabellen till exportPdf
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
          }}
          onCellValueChanged={(params) => {
            console.log(
              "✏️ Cell edited:",
              params.colDef.field,
              "=",
              params.newValue
            );
          }}
        />
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "20px",
            height: "20px",
            cursor: "nwse-resize",
            backgroundColor: "#4a7c59",
            borderTopLeftRadius: "4px",
            opacity: 0.7,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          title="Dra för att ändra storlek"
        >
          <div
            style={{
              position: "absolute",
              bottom: "2px",
              right: "2px",
              fontSize: "14px",
              color: "#fff",
              userSelect: "none",
            }}
          ></div>
        </div>
      </div>
      {/* Resize text - utanför containern */}
      <div
        style={{
          textAlign: "right",
          fontSize: "12px",
          color: "#4a7c59",
          fontWeight: "600",
          marginTop: "5px",
          marginRight: "auto",
          marginLeft: "auto",
          maxWidth: "95vw",
          width: tableWidth,
        }}
      >
        Ändra Storlek
      </div>
      <ExportPDF gridRef={gridRef} />
    </>
  );
};

export default EditableTable;
