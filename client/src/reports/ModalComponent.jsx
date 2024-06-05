import React from "react";
import Modal from "react-modal";
import * as XLSX from "xlsx";

Modal.setAppElement("#root");

const ModalComponent = ({ isOpen, onRequestClose, data, reportName, headers }) => {
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(record => {
      const formattedRecord = {};
      headers.forEach(header => {
        switch (header) {
          case "Publication Date":
            formattedRecord[header] = record.pub_date || 'N/A';
            break;
          case "Edition Name":
            formattedRecord[header] = record.ed_name || 'N/A';
            break;
          case "Schedule Time":
            formattedRecord[header] = record.schedule_time || 'N/A';
            break;
          case "Actual Time":
            formattedRecord[header] = record.actual_time || 'N/A';
            break;
          case "Difference Time":
            formattedRecord[header] = record.difference_time || 'N/A';
            break;
          case "Reason for Delay":
            formattedRecord[header] = record.reason_for_delay || 'N/A';
            break;
          case "Unit":
            formattedRecord[header] = record.unit || 'N/A';
            break;
          case "Publication":
            formattedRecord[header] = record.pub || 'N/A';
            break;
          case "Total no of Pages":
            formattedRecord[header] = record.total_no_of_pages || 'N/A';
            break;
          case "B&W pages":
            formattedRecord[header] = record.black_and_white_pages || 'N/A';
            break;
          case "Color pages":
            formattedRecord[header] = record.color_pages || 'N/A';
            break;
          case "No. of plates":
            formattedRecord[header] = record.no_of_plates || 'N/A';
            break;
          case "Reason for stoppage":
            formattedRecord[header] = record.reason_for_stoppage || 'N/A';
            break;
          case "Stop from time":
            formattedRecord[header] = record.stop_from_time || 'N/A';
            break;
          case "Stop end time":
            formattedRecord[header] = record.stop_end_time || 'N/A';
            break;
          case "Machine used":
            formattedRecord[header] = record.machine_used || 'N/A';
            break;
          case "Print order":
            formattedRecord[header] = record.print_order || 'N/A';
            break;
          case "Page size":
            formattedRecord[header] = record.page_size || 'N/A';
            break;
          case "Print start time":
            formattedRecord[header] = record.print_start_time || 'N/A';
            break;
          case "Print stop time":
            formattedRecord[header] = record.print_stop_time || 'N/A';
            break;
          case "Gross copies":
            formattedRecord[header] = record.gross_copies || 'N/A';
            break;
          case "Towers Used":
            formattedRecord[header] = record.Towers || 'N/A';
            break;
          default:
            formattedRecord[header] = 'N/A';
        }
      });
      return formattedRecord;
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, reportName);
    XLSX.writeFile(wb, `${reportName}.xlsx`);
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
          display: "flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "80%",
          overflowY: "auto",
          width: "80%",
          gap: "5px"
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
        <button onClick={downloadExcel}>Download as Excel</button>
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
