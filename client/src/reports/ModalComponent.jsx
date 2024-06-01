import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalComponent = ({ isOpen, onRequestClose, data, reportName, headers }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Report Modal"
      shouldCloseOnOverlayClick={false} // Prevent closing when clicking outside the modal
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "80%",
          overflowY: "auto",
          width: "80%",
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
      <br />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

// Helper function to format cell values
const formatCellValue = (value) => {
  if (value === null || value === undefined) {
    return "N/A";
  } else if (typeof value === "object" && value instanceof Date) {
    // Format date and time values
    return value.toLocaleString();
  } else {
    return value.toString();
  }
};

export default ModalComponent;
