import { useState } from "react";
import styles from "./UploadFile.module.css";

const UploadFile = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      setSelectedFile(file);
      onFileUpload(file);
    } else {
      alert("Endast .xlsx-filer stöds just nu");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Redigera budget</h1>

      <div className={styles.fileRow}>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          id="file-input"
          className={styles.fileInput}
        />
        <label htmlFor="file-input" className={styles.button}>
          Välj fil
        </label>
        <span className={styles.fileName}>
          {selectedFile ? selectedFile.name : "Format: .xlsx"}
        </span>
      </div>
    </div>
  );
};

export default UploadFile;
