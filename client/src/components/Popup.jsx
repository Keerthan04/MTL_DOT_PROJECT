// Popup.js
import React, { useEffect } from 'react';
import './Popup.css'; // Add some basic styling for the popup

const Popup = ({ message, onClose, duration, buttonDisp }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        {buttonDisp ? 
          <button onClick={onClose}>Close</button> : null
        }
        
      </div>
    </div>
  );
};

export default Popup;
