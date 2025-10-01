import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportPDF = ({ gridRef }) => {
  //funktion som skapar PDF och returnerar doc
  const createPdf = (headers, data) => {
    const doc = new jsPDF();

    //titel
    doc.setFontSize(16);
    doc.text("Exporterad tabell", 14, 15);

    //datum
    doc.setFontSize(10);
    doc.text(`Datum: ${new Date().toLocaleDateString()}`, 14, 22);

    //tabell (med autotable)
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 30,
    });

    return doc;
  };

  const handleExport = () => {
    //funktion som hanterar export
    const api = gridRef?.current?.api; //gridref kommer som prop från agGrid i editableTable
    if (!api) return;

    //hämta alla kolumner från agGrid
    const headers = api.getColumnDefs().map((col) => col.field);

    const rowData = [];
    api.forEachNode((node) => rowData.push(node.data)); //node.data gör att varje rad i agGrid blir ett objekt

    //data är datan vi matar in i autotable, den vill inte ha raderna som objekt utan en array av arrays
    const data = rowData.map((row) => headers.map((h) => row[h] ?? ""));

    //skapa och spara PDF
    const doc = createPdf(headers, data);
    doc.save("tabell.pdf");
  };

  return <button onClick={handleExport}>Exportera PDF</button>;
};

export default ExportPDF;
