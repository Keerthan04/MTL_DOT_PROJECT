import React from "react";
import Modal from "react-modal";
import jsPDF from "jspdf";
import "jspdf-autotable";

Modal.setAppElement("#root");

const ModalComponent = ({ isOpen, onRequestClose, data, reportName, headers }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text(reportName, 20, 10);

    const tableColumn = headers;
    const tableRows = [];

    // Helper function to split columns into chunks that fit the page width
    const splitColumnsIntoChunks = (columns, chunkWidth) => {
      const chunks = [];
      let currentChunk = [];
      let currentWidth = 0;

      columns.forEach((column, index) => {
        const columnWidth = 20; // Adjust this width based on your needs
        if (currentWidth + columnWidth > chunkWidth) {
          chunks.push(currentChunk);
          currentChunk = [];
          currentWidth = 0;
        }
        currentChunk.push(column);
        currentWidth += columnWidth;
      });

      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      }

      return chunks;
    };

    const columnChunks = splitColumnsIntoChunks(headers, pageWidth - 40); // Leave some margin

    data.forEach(record => {
      const tableRow = headers.map(header => {
        // Map headers to corresponding data fields
        switch (header) {
          case "Publication Date":
            return record.pub_date || 'N/A';
          case "Edition Name":
            return record.ed_name || 'N/A';
          case "Schedule Time":
            return record.schedule_time || 'N/A';
          case "Actual Time":
            return record.actual_time || 'N/A';
          case "Difference Time":
            return record.difference_time || 'N/A';
          case "Reason for Delay":
            return record.reason_for_delay || 'N/A';
          case "Unit":
            return record.unit || 'N/A';
          case "Publication":
            return record.pub || 'N/A';
          case "Total no of Pages":
            return record.total_no_of_pages || 'N/A';
          case "B&W pages":
            return record.black_and_white_pages || 'N/A';
          case "Color pages":
            return record.color_pages || 'N/A';
          case "No. of plates":
            return record.no_of_plates || 'N/A';
          case "Reason for stoppage":
            return record.reason_for_stoppage || 'N/A';
          case "Stop from time":
            return record.stop_from_time || 'N/A';
          case "Stop end time":
            return record.stop_end_time || 'N/A';
          case "Machine used":
            return record.machine_used || 'N/A';
          case "Print order":
            return record.print_order || 'N/A';
          case "Page size":
            return record.page_size || 'N/A';
          case "Print start time":
            return record.print_start_time || 'N/A';
          case "Print stop time":
            return record.print_stop_time || 'N/A';
          case "Gross copies":
            return record.gross_copies || 'N/A';
          case "Towers Used":
            return record.Towers || 'N/A';
          default:
            return 'N/A';
        }
      });
      tableRows.push(tableRow);
    });

    columnChunks.forEach((columnChunk, index) => {
      const tableChunk = tableRows.map(row => row.slice(index * columnChunk.length, (index + 1) * columnChunk.length));
      doc.autoTable({
        head: [columnChunk],
        body: tableChunk,
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 20,
        styles: { fontSize: 8 },
        margin: { top: 20, left: 5, right: 5, bottom: 20 },
      });
    });

    doc.save(`${reportName}.pdf`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Report Modal"
      shouldCloseOnOverlayClick={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          display:"flex",
          flexDirection:"column",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "80%",
          overflowY: "auto",
          width: "80%",
          gap:"5px"
        },
      }}
    >
      <div className="table-header">
        <h3>{reportName}</h3>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((record, recordIndex) => (
                <tr key={recordIndex}>
                  {Object.keys(record).map((key, keyIndex) => (
                    <td key={keyIndex}>{formatCellValue(record[key])}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="modalbut">
        <button onClick={onRequestClose}>Close</button>
        <button onClick={downloadPDF}>Download as PDF</button>
      </div>
      
    </Modal>
  );
};

const formatCellValue = (value) => {
  if (value === null || value === undefined) {
    return "N/A";
  } else if (typeof value === "object" && value instanceof Date) {
    return value.toLocaleString();
  } else {
    return value.toString();
  }
};

export default ModalComponent;
