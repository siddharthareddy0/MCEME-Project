import React, { useState } from "react";
import Officernavbar from "./Officernavbar";
import "./officer.css";

function Officer() {
    const [requests, setRequests] = useState([
        { id: 1, armyNumber: "12345", type: "Leave", status: "Pending" },
        { id: 2, armyNumber: "67890", type: "Transfer", status: "Approved" },
        { id: 3, armyNumber: "11223", type: "Promotion", status: "Rejected" }
    ]); // Sample data

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [notification, setNotification] = useState(""); // Notification message

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
        setShowDetails(true);
    };

    const handleBack = () => {
        setShowDetails(false);
        setSelectedRequest(null);
    };

    const handleAction = (action) => {
        // Set the notification message
        setNotification(`Request ${action === "approve" ? "Approved" : "Rejected"} successfully!`);

        // Hide the notification after 3 seconds
        setTimeout(() => {
            setNotification("");
        }, 3000);
    };

    return (
        <div>
               <Officernavbar />
            <div className="officer-container">
                {notification && <div className="notification">{notification}</div>} {/* Notification Bar */}
                
                {showDetails ? (
                    // Request Details View
                    <div className="request-details">
                        <div className="header-container">
                            <h3>Request Details</h3>
                            <button className="back-btn6" onClick={handleBack}>⬅ Back</button>
                        </div>
                        <div className="form-details">
                            <div className="detail-row">
                                <label>Army Number:</label>
                                <span>{selectedRequest.armyNumber}</span>
                            </div>
                            <div className="detail-row">
                                <label>Type:</label>
                                <span>{selectedRequest.type}</span>
                            </div>
                            <div className="detail-row">
                                <label>Status:</label>
                                <span>{selectedRequest.status}</span>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <button className="approve-btn" onClick={() => handleAction("approve")}>Approve</button>
                            <button className="reject-btn" onClick={() => handleAction("reject")}>Reject</button>
                        </div>
                    </div>
                ) : (
                    // Table View
                    <div className="requests-table">
                        <h2>Part 2 Order Requests</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>SL. No</th>
                                    <th>Army Number</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request, index) => (
                                    <tr 
                                        key={request.id} 
                                        onClick={() => handleRequestClick(request)}
                                        className=""
                                    >
                                        <td>{index + 1}</td>
                                        <td>{request.armyNumber}</td>
                                        <td>{request.type}</td>
                                        <td>{request.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Officer;
