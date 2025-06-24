import React from "react";
import "./CustomModal.css";
import {
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt,
  FaBirthdayCake, FaHome, FaMoneyBill, FaDog, FaInfoCircle, FaTimes
} from "react-icons/fa";

const CustomModal = ({ show, onClose, data }) => {
  if (!show) return null;

  const formatValue = (val) => (val !== null && val !== undefined && val !== "") ? val : "—";

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h2><FaUser className="modal-icon" /> User Information</h2>
          <button className="modal-close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="custom-modal-body">
          {data ? (
            <div className="modal-grid-2col">
              <div className="modal-item"><label>👤 Username:</label> <span>{formatValue(data.user_name)}</span></div>
              <div className="modal-item"><label>🧑 First Name:</label> <span>{formatValue(data.first_name)}</span></div>
              <div className="modal-item"><label>🧑‍🦱 Last Name:</label> <span>{formatValue(data.last_name)}</span></div>
              <div className="modal-item"><label><FaEnvelope /> Email:</label> <span>{formatValue(data.email)}</span></div>
              <div className="modal-item"><label><FaPhone /> Phone:</label> <span>{formatValue(data.phone_number)}</span></div>
              <div className="modal-item"><label><FaCalendarAlt /> Created At:</label> <span>{new Date(data.user_created_at).toLocaleString()}</span></div>
              <div className="modal-item"><label><FaBirthdayCake /> DOB:</label> <span>{formatValue(data.dob)}</span></div>
              <div className="modal-item"><label><FaMapMarkerAlt /> Country:</label> <span>{formatValue(data.country)}</span></div>
              <div className="modal-item"><label>🏙️ State:</label> <span>{formatValue(data.state)}</span></div>
              <div className="modal-item"><label>🏠 Province:</label> <span>{formatValue(data.province)}</span></div>
              <div className="modal-item"><label>📮 ZIP:</label> <span>{formatValue(data.zip)}</span></div>
              <div className="modal-item"><label>🏘️ Home Status:</label> <span>{formatValue(data.homestatus)}</span></div>
              <div className="modal-item"><label><FaMoneyBill /> Income:</label> <span>{formatValue(data.householdincome)}</span></div>
              <div className="modal-item"><label>💼 Employment:</label> <span>{formatValue(data.employmentstatus)}</span></div>
              <div className="modal-item"><label><FaDog /> Pet Status:</label> <span>{formatValue(data.petstatus)}</span></div>
              <div className="modal-item"><label><FaInfoCircle /> Feedback:</label> <span>{formatValue(data.feedback)}</span></div>
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </div>
        <div className="custom-modal-footer">
          <button className="primary-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
