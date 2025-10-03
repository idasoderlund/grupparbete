import { useState } from "react";
import UploadFile from "./Components/UploadFile";
import ExcelParser from "./Components/ExcelParser";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (data) => {
    if (data instanceof File) {
      setFile(data);
    }
  };

  return (
    <div>
      {}
      <UploadFile onFileUpload={handleFileUpload} />

      {}
      {file && <ExcelParser file={file} />}
    </div>
  );
}

export default App;
