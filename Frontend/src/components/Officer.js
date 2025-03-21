import React, { useState, useEffect } from "react";
import Officernavbar from "./Officernavbar";
import "./officer.css";
import kinderedRollService from "../services/kinderedRollService";

function Officer() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [notification, setNotification] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await kinderedRollService.getAllRecords();
                // Sort the data by POT number in descending order (assuming POT numbers are sequential)
                const sortedData = data.sort((a, b) => {
                    // Extract numeric part if POT numbers contain non-numeric characters
                    const aNum = parseInt(a.pot_no.replace(/\D/g, ''));
                    const bNum = parseInt(b.pot_no.replace(/\D/g, ''));
                    return bNum - aNum;
                });
                setRequests(sortedData);
            } catch (error) {
                console.error('Error fetching requests:', error);
                setNotification('Failed to load requests');
            }
        };
        fetchRequests();
    }, []);

    const handleRequestClick = (request) => {
        if (request.status === 'Rejected') {
            setNotification("Details for rejected requests are not accessible");
            setTimeout(() => setNotification(""), 3000);
            return;
        }
        // Extract details from the details property
        setSelectedRequest({
            ...request,
            ...request.details
        });
        setShowDetails(true);
    };

    const handleBack = () => {
        setShowDetails(false);
        setSelectedRequest(null);
    };

    const handleAction = async (action) => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            
            if (!selectedRequest || !selectedRequest.pot_no) {
                throw new Error("Invalid request: No ID found");
            }

            // Check if request is already processed
            if (selectedRequest.status === "Approved" || selectedRequest.status === "Rejected") {
                setNotification("This request has already been processed");
                return;
            }

            const newStatus = action === "approve" ? "Approved" : "Rejected";
            const result = await kinderedRollService.updateStatus(selectedRequest.pot_no, newStatus);
            
            if (result) {
                // Update the local state with the correct matching
                setRequests(prevRequests => prevRequests.map(req =>
                    req.pot_no === selectedRequest.pot_no ? { ...req, status: newStatus } : req
                ));
                
                setNotification(`Request ${newStatus.toLowerCase()} successfully!`);
                setShowDetails(false);
                setSelectedRequest(null);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setNotification(error.message || `Failed to ${action} request`);
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotification(""), 3000);
        }
    };

    return (
        <div>
            <Officernavbar />
            <div className="officer-container">
                {notification && <div className="notification">{notification}</div>}
                
                {showDetails ? (
                    <div className="request-details">
                        <div className="header-container">
                            <h3>Request Details</h3>
                            <button className="back-btn6" onClick={handleBack}>⬅ Back</button>
                        </div>
                        <div className="form-details">
                            {selectedRequest.army_number && (
                                <div className="detail-row">
                                    <label>Army Number:</label>
                                    <span>{selectedRequest.army_number}</span>
                                </div>
                            )}
                            {selectedRequest.name && (
                                <div className="detail-row">
                                    <label>Name:</label>
                                    <span>{selectedRequest.name}</span>
                                </div>
                            )}
                            {selectedRequest.trade && (
                                <div className="detail-row">
                                    <label>Trade:</label>
                                    <span>{selectedRequest.trade}</span>
                                </div>
                            )}
                            {selectedRequest.category && (
                                <div className="detail-row">
                                    <label>Category:</label>
                                    <span>{selectedRequest.category}</span>
                                </div>
                            )}
                            
                            {selectedRequest.type === 'KINDERED' ? (
                                <>
                                    {selectedRequest.child_relation && (
                                        <div className="detail-row">
                                            <label>Child Relation:</label>
                                            <span>{selectedRequest.child_relation}</span>
                                        </div>
                                    )}
                                    {selectedRequest.child_name && (
                                        <div className="detail-row">
                                            <label>Name of Child:</label>
                                            <span>{selectedRequest.child_name}</span>
                                        </div>
                                    )}
                                    {selectedRequest.date_of_birth && (
                                        <div className="detail-row">
                                            <label>Date of Birth:</label>
                                            <span>{new Date(selectedRequest.date_of_birth).toLocaleDateString('en-GB').split('T')[0]}</span>
                                        </div>
                                    )}
                                    {selectedRequest.place_of_birth && (
                                        <div className="detail-row">
                                            <label>Place of Birth:</label>
                                            <span>{selectedRequest.place_of_birth}</span>
                                        </div>
                                    )}
                                    {selectedRequest.proof_certificate && (
                                        <div className="detail-row">
                                            <label>Proof of Certificate:</label>
                                            <span>{selectedRequest.proof_certificate}</span>
                                        </div>
                                    )}
                                    {selectedRequest.application_no && (
                                        <div className="detail-row">
                                            <label>Application No:</label>
                                            <span>{selectedRequest.application_no}</span>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {selectedRequest.spousename && (
                                        <div className="detail-row">
                                            <label>Spouse Name:</label>
                                            <span>{selectedRequest.spousename}</span>
                                        </div>
                                    )}
                                    {selectedRequest.marriage_date && (
                                        <div className="detail-row">
                                            <label>Marriage Date:</label>
                                            <span>{new Date(selectedRequest.marriage_date).toLocaleDateString('en-GB').split('T')[0]}</span>
                                        </div>
                                    )}
                                    {selectedRequest.place_of_marriage && (
                                        <div className="detail-row">
                                            <label>Place of Marriage:</label>
                                            <span>{selectedRequest.place_of_marriage}</span>
                                        </div>
                                    )}
                                    {selectedRequest.proof_certificate && (
                                        <div className="detail-row">
                                            <label>Proof of Certificate:</label>
                                            <span>{selectedRequest.proof_certificate}</span>
                                        </div>
                                    )}
                                </>
                            )}

                            {selectedRequest.regn_no && (
                                <div className="detail-row">
                                    <label>Registration No:</label>
                                    <span>{selectedRequest.regn_no}</span>
                                </div>
                            )}
                            {selectedRequest.date_of_registration && (
                                <div className="detail-row">
                                    <label>Date of Registration:</label>
                                    <span>{new Date(selectedRequest.date_of_registration).toLocaleDateString('en-GB').split('T')[0]}</span>
                                </div>
                            )}
                            {selectedRequest.place_of_registration && (
                                <div className="detail-row">
                                    <label>Place of Registration:</label>
                                    <span>{selectedRequest.place_of_registration}</span>
                                </div>
                            )}
                        </div>
                        <div className="action-buttons">
                            <button 
                                className="approve-btn" 
                                onClick={() => handleAction("approve")}
                                disabled={isLoading || selectedRequest.status === "Approved" || selectedRequest.status === "Rejected"}
                            >
                                {isLoading ? 'Processing...' : 
                                 selectedRequest.status === "Approved" || selectedRequest.status === "Rejected" ? 
                                 'Already Processed' : 'Approve'}
                            </button>
                            <button 
                                className="reject-btn" 
                                onClick={() => handleAction("reject")}
                                disabled={isLoading || selectedRequest.status === "Approved" || selectedRequest.status === "Rejected"}
                            >
                                {isLoading ? 'Processing...' : 
                                 selectedRequest.status === "Approved" || selectedRequest.status === "Rejected" ? 
                                 'Already Processed' : 'Reject'}
                            </button>
                        </div>
                        {(selectedRequest.status === "Approved" || selectedRequest.status === "Rejected") && 
                            <div className="status-message">
                                This request has already been {selectedRequest.status.toLowerCase()}
                            </div>
                        }
                    </div>
                ) : (
                    <div className="requests-table">
                        <h2>Part 2 Order Requests</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>SL. No</th>
                                    <th>PTO Number</th>
                                    <th>Army Number</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request, index) => (
                                    <tr 
                                        key={request.pot_no} 
                                        onClick={() => handleRequestClick(request)}
                                        className={`clickable-row ${request.status === "Rejected" ? 'rejected' : 
                                                   request.status === "Approved" ? 'processed' : ''}`}
                                        style={{ cursor: request.status === 'Rejected' ? 'not-allowed' : 'pointer' }}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{request.pot_no}</td>
                                        <td>{request.details?.army_number}</td>
                                        <td>{request.type}</td>
                                        <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
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
