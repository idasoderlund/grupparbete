import React from "react";
import UploadFile from "./Components/UploadFile";
import "./App.css";

function App() {
  const handleFileUpload = (data) => {
    console.log("Uppladdad fil eller länk:", data);
    //Här ska  i skicka vidare till excel-parser eller sheets API
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Mr Bedfort",
          fontSize: "3rem",
          color: "#B6CEB4",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
        }}
      >
        Redigera budget ⬇️
      </h1>
      <UploadFile onFileUpload={handleFileUpload} />
    </div>
  );
}

export default App;
