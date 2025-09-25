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
      <h1 style={{ textAlign: "center" }}>Redigera budget:</h1>
      <UploadFile onFileUpload={handleFileUpload} />
    </div>
  );
}

export default App;
