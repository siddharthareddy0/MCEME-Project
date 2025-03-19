import React, { useState } from "react";
import NavBar from "./NavBar";
import "./kinderedRoll.css";

const KinderedRoll = () => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [formData, setFormData] = useState({
    serviceNo: "",
    name: "",
    trade: "",
    category: "",
    childRelation: "",
    childName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    proofCertificate: "",
    applicationNo: "",
    regnNo: "",
    dateOfRegistration: "",
    placeOfRegistration: "",
  });

  const trades = ["A", "B", "C"];
  const categories = ['Ind','Non-Ind'];
  const relations = ["Son", "Daughter"];
  const proofTypes = ["Birth Certificate", "Aadhar Card", "School Certificate"];

  // Notification component
  const Notification = ({ message }) => {
    return message ? <div className="notification">{message}</div> : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      serviceNo: "",
      name: "",
      trade: "",
      category: "",
      childRelation: "",
      childName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      proofCertificate: "",
      applicationNo: "",
      regnNo: "",
      dateOfRegistration: "",
      placeOfRegistration: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
    
    // Show success notification
    setNotificationMessage('Form submitted successfully!');
    
    // Reset form
    resetForm();
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  };

  return (
    <div>
      <NavBar />
      <Notification message={notificationMessage} />
      <div className="kindered-form-container">
        <div className="kindered-form-section">
          {/* /* <div className="print-button-container">
            <button onClick={handlePrint} className="print-button6">
              <i className="fas fa-print"></i> <FaPrint/> Print
            </button>
          </div> */ }
          <h2>Kindered Roll Registration Form</h2>
          <form onSubmit={handleSubmit} className="kindered-form">
            <div className="kindered-form-row">
              <label>Service No:</label>
              <input
                type="text"
                name="serviceNo"
                value={formData.serviceNo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Trade:</label>
              <select
                name="trade"
                value={formData.trade}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Trade</option>
                {trades.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
            </div>

            <div className="kindered-form-row">
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="kindered-form-row">
              <label>Child Relation:</label>
              <select
                name="childRelation"
                value={formData.childRelation}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Relation</option>
                {relations.map((relation) => (
                  <option key={relation} value={relation}>
                    {relation}
                  </option>
                ))}
              </select>
            </div>

            <div className="kindered-form-row">
              <label>Name of Child:</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Place of Birth:</label>
              <input
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Proof of Certificate:</label>
              <select
                name="proofCertificate"
                value={formData.proofCertificate}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Proof Type</option>
                {proofTypes.map((proof) => (
                  <option key={proof} value={proof}>
                    {proof}
                  </option>
                ))}
              </select>
            </div>

            <div className="kindered-form-row">
              <label>Application No:</label>
              <input
                type="text"
                name="applicationNo"
                value={formData.applicationNo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Registration No:</label>
              <input
                type="text"
                name="regnNo"
                value={formData.regnNo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Date of Registration:</label>
              <input
                type="date"
                name="dateOfRegistration"
                value={formData.dateOfRegistration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-row">
              <label>Place of Registration:</label>
              <input
                type="text"
                name="placeOfRegistration"
                value={formData.placeOfRegistration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kindered-form-actions full-width">
              <button type="submit" className="kindered-submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KinderedRoll;