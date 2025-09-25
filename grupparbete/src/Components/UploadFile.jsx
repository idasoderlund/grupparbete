// Ida - skapa komponent för filuppladdning
import React, { useState } from "react";
import styles from "./UploadFile.module.css";

const UploadFile = ({ onFileUpload }) => {
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      onFileUpload(file);
    } else {
      alert("Endast .xlsx-filer stöds just nu");
    }
  };

  const handleGoogleSheetSubmit = (e) => {
    e.preventDefault();
    if (googleSheetUrl.includes("docs.google.com/spreadsheets")) {
      onFileUpload(googleSheetUrl);
    } else {
      alert("Ogiltig  Google Sheet-länk");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ladda upp Excel eller Google Sheet</h2>

      <input type="file" accept=".xlsx" onChange={handleFileChange} />

      <div className={styles.or}>eller</div>

      <form onSubmit={handleGoogleSheetSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Klistra in Google Sheet-länk"
          value={googleSheetUrl}
          onChange={(e) => setGoogleSheetUrl(e.target.value)}
          className={styles.input}
        ></input>
        <button type="submit" className={styles.button}>
          Ladda upp fil...
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
