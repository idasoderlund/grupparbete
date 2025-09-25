// Ida - skapa komponent för filuppladdning
import React, { useState } from "react";

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
    <div className="upload-container" style={styles.container}>
      <h2>Ladda upp Excel eller Google Sheet</h2>

      <input type="file" accept=".xlsx" onChange={handleFileChange} />

      <div style={styles.or}>eller</div>

      <form onSubmit={handleGoogleSheetSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Klistra in Google Sheet-länk"
          value={googleSheetUrl}
          onChange={(e) => setGoogleSheetUrl(e.target.value)}
          style={styles.input}
        ></input>
        <button type="submit" style={styles.button}>
          Ladda...
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "2rem auto",
    textAlign: "center",
  },

  or: {
    margin: "1rem 0",
    fontWeight: "bold",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  input: {
    padding: "0.5rem",
    fontSize: "1rem",
  },

  button: {
    padding: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UploadFile;
