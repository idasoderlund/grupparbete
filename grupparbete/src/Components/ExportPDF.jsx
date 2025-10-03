import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportPDF = ({ gridRef }) => {
  const createPdf = (headers, data) => {
    const orientation = headers.length > 8 ? "landscape" : "portrait";
    const doc = new jsPDF({ orientation });

    doc.setFontSize(16);
    doc.text("Exporterad tabell", 14, 15);

    doc.setFontSize(10);
    doc.text(`Datum: ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 30,
      theme: "grid",
    });

    return doc;
  };

  const handleExport = () => {
    const api = gridRef?.current?.api;
    if (!api) return;

    const headers = api.getColumnDefs().map((col) => col.field);

    const rowData = [];
    api.forEachNode((node) => rowData.push(node.data));

    const data = rowData.map((row) => headers.map((h) => row[h] ?? ""));

    const doc = createPdf(headers, data);
    doc.save("tabell.pdf");
  };

  return <button onClick={handleExport}>Exportera PDF</button>;
};

export default ExportPDF;
