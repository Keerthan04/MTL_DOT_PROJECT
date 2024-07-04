import Modal from "react-modal";
import React from "react";

Modal.setAppElement("#root");

const DOTModalComponent = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      shouldCloseOnOverlayClick={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center children horizontally
          justifyContent: "center", // Center children vertically
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "80%",
          overflowY: "auto",
          width: "80%",
          maxWidth: "800px", // Limit maximum width for larger screens
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <div className="modal-content">
        {children}
        
      </div>
    </Modal>
  );
};

export default DOTModalComponent;
