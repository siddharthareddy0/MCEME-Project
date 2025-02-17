import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "./LeaveManagement.css";

const Notification = ({ message }) => (
  <div className="notification">{message}</div>
);

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };
  return <span className={getStatusClass()}>{status}</span>;
};

const LeaveManagement = () => {
  // TODO: Replace with API call
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      rank: "Sergeant",
      section: "HQ Wing",
      trade: "Technical",
      type: "ML",
      leaveType: "EL",
      recommendationStatus: "Recommended",
      fromDate: "2025-02-01",
      toDate: "2025-02-10",
      daysRequested: 10,
      reason: "Family vacation",
      address: "123 Main St, City",
      recommendation: "Recommended",
      sectionOfficer: "Capt. Smith",
      sectionOfficerSignature: null,
      recommendationDate: null,
      estOfficerSignature: null,
      approvalDate: null,
      status: "Pending",
      history: [
        {
          fromDate: "2024-12-01",
          toDate: "2024-12-05",
          type: "Casual Leave",
          takenDays: 5
        }
      ],
      leaveBalance: [
        {
          type: "Annual Leave",
          total: 30,
          taken: 10,
          remaining: 20
        },
        {
          type: "Casual Leave",
          total: 15,
          taken: 5,
          remaining: 10
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      rank: "Corporal",
      section: "Training Wing",
      trade: "Administrative",
      type: "EL",
      leaveType: "ML",
      recommendationStatus: "Not Recommended",
      fromDate: "2025-02-05",
      toDate: "2025-02-08",
      daysRequested: 4,
      reason: "Medical treatment",
      address: "456 Oak St, Town",
      recommendation: "Not Recommended",
      sectionOfficer: "Lt. Johnson",
      sectionOfficerSignature: null,
      recommendationDate: null,
      estOfficerSignature: null,
      approvalDate: null,
      status: "Approved",
      history: [
        {
          fromDate: "2024-11-15",
          toDate: "2024-11-18",
          type: "Sick Leave",
          takenDays: 4
        }
      ],
      leaveBalance: [
        {
          type: "Annual Leave",
          total: 30,
          taken: 5,
          remaining: 25
        },
        {
          type: "Sick Leave",
          total: 15,
          taken: 4,
          remaining: 11
        }
      ]
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");

  // TODO: Fetch applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        // const response = await fetch('/api/leave-applications');
        // const data = await response.json();
        // setApplications(data);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleEmployeeClick = useCallback((employee) => {
    if (!employee) return;
    setSelectedEmployee(employee);
    setShowApplicationForm(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowApplicationForm(false);
    setSelectedEmployee(null);
    setError(null);
  }, []);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(""), 2000);
  };

  // TODO: Integrate with backend
  const handleDecision = useCallback(async (id, decision) => {
    try {
      setIsLoading(true);
      const currentDate = new Date().toISOString().split('T')[0];
      // TODO: In real implementation, get the est officer's signature from the backend
      const estOfficerSignature = "Est. Officer Digital Signature"; // This should come from the backend
      
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { 
            ...app, 
            status: decision,
            estOfficerSignature,
            approvalDate: currentDate
          } : app
        )
      );
      
      setSelectedEmployee((prev) => ({
        ...prev,
        status: decision,
        estOfficerSignature,
        approvalDate: currentDate
      }));

      showNotification(`Leave application has been ${decision.toLowerCase()}!`);
    } catch (err) {
      setError(`Failed to process decision: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEstOfficerStamp = (status) => {
    if (status === 'Approved') {
      return `
        <div style="
          border: 2px solid #173B45;
          border-radius: 50%;
          padding: 5px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-weight: bold;
          color: #173B45;
          text-align: center;
          font-size: 8px;
        ">
          APPROVED<br>
          Est Officer<br>
          MCEME
        </div>
      `;
    } else if (status === 'Rejected') {
      return `
        <div style="
          border: 2px solid #dc3545;
          border-radius: 50%;
          padding: 5px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-weight: bold;
          color: #dc3545;
          text-align: center;
          font-size: 8px;
        ">
          REJECTED<br>
          Est Officer<br>
          MCEME
        </div>
      `;
    }
    return '';
  };

  const handlePrint = useCallback((app) => {
    try {
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Leave Application</title>
            <style>
              @page {
                size: A4;
                margin: 1.5cm;
              }
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: Arial, sans-serif;
                width: 100%;
                height: 100%;
              }
              .print-content {
                text-align: left;
                margin: 0 auto;
                padding: 20px;
                width: 100%;
                max-width: 900px;
              }
              .print-header {
                text-align: center;
                margin-bottom: 20px;
              }
              .print-header h2 {
                font-size: 18px;
                font-weight: bold;
                margin: 10px 0;
                text-transform: uppercase;
              }
              .form-row {
                margin: 15px 0;
                display: flex;
                align-items: center;
              }
              .form-row span:not(.underline) {
                white-space: nowrap;
                padding-right: 10px;
                font-size: 14px;
                font-weight: 500;
              }
              .underline {
                border-bottom: 1px solid black;
                padding: 2px 5px;
                flex: 1;
                min-width: 100px;
                margin: 0 5px;
                font-size: 14px;
              }
              .signature-row {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: 25px;
                align-items: flex-start;
              }
              .signature-box {
                margin-bottom: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 60px;
              }
              .signature-line {
                font-size: 12px;
                text-align: center;
                margin-top: 5px;
              }
              .part-2 {
                margin-top: 20px;
                text-align: center;
                page-break-inside: avoid;
              }
              .part-2 h3 {
                font-size: 16px;
                font-weight: bold;
                text-decoration: underline;
                margin: 8px 0;
                text-transform: uppercase;
              }
              .recommendation-row,
              .approval-row {
                margin: 10px 0;
                font-weight: 500;
              }
            </style>
          </head>
          <body>
            <div class="print-content">
              <div class="print-header">
                <h2>MILITARY COLLEGE OF EME</h2>
                <h2>LEAVE APPLICATION</h2>
              </div>
              
              <div class="print-form">
                <div class="form-row">
                  <span>PERS NO:</span>
                  <span class="underline">${app.id || ''}</span>
                  <span>Name:</span>
                  <span class="underline">${app.name || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>Rank:</span>
                  <span class="underline">${app.rank || ''}</span>
                  <span>Section:</span>
                  <span class="underline">${app.section || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>Type of Leave:</span>
                  <span class="underline">${app.type || ''}</span>
                  <span>Days Requested:</span>
                  <span class="underline">${app.daysRequested || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>From Date:</span>
                  <span class="underline">${app.fromDate || ''}</span>
                  <span>To Date:</span>
                  <span class="underline">${app.toDate || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>Reason:</span>
                  <span class="underline" style="flex: 2">${app.reason || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>Address on Leave:</span>
                  <span class="underline" style="flex: 2">${app.address || ''}</span>
                </div>

                <div class="part-2">
                  <h3>PART II - RECOMMENDATION</h3>
                  <div class="recommendation-row">
                    ${app.recommendation || 'Pending'}
                  </div>
                  
                  <div class="signature-row">
                    <div class="signature-left">
                      <span>Date: </span>
                      <span class="underline">${app.recommendationDate || ''}</span>
                    </div>
                    <div class="signature-right">
                      <div class="signature-box">${app.sectionOfficerSignature || ''}</div>
                      <div class="signature-line">(Section Officer)</div>
                    </div>
                  </div>
                </div>

                <div class="part-2">
                  <h3>PART III - APPROVAL</h3>
                  <div class="approval-row">
                    ${app.status || 'Pending'}
                  </div>

                  <div class="signature-row">
                    <div class="signature-left">
                      <span>Date: </span>
                      <span class="underline">${app.approvalDate || ''}</span>
                    </div>
                    <div class="signature-right">
                      <div class="signature-box">
                        ${getEstOfficerStamp(app.status)}
                      </div>
                      <div class="signature-line">(Est Officer)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
      
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      iframe.contentDocument.write(printContent);
      iframe.contentDocument.close();

      iframe.contentWindow.onafterprint = () => {
        document.body.removeChild(iframe);
      };
      
      iframe.contentWindow.print();

    } catch (err) {
      console.error(`Failed to print: ${err.message}`);
    }
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => setError(null)}>Dismiss</button>
      </div>
    );
  }

  return (
    <div className="leave-management">
      {notificationMessage && <Notification message={notificationMessage} />}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
      
      {!showApplicationForm ? (
        <div className="leave-table-container">
          <h2>INDUSTRIAL / NON-INDUSTRIAL PERSONNEL</h2>
          <table className="leave-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Employee Name</th>
                <th>Rank</th>
                <th>Section</th>
                <th>Type of Leave</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>
                    <button 
                      className="name-button" 
                      onClick={() => handleEmployeeClick(app)}
                      disabled={isLoading}
                    >
                      {app.name}
                    </button>
                  </td>
                  <td>{app.rank || '-'}</td>
                  <td>{app.section}</td>
                  <td>{app.type}</td>
                  <td><StatusBadge status={app.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="application-page">
          <div className="application-header">
            <h3>Leave Application Form</h3>
            <button 
              className="back-button" 
              onClick={handleBack}
              disabled={isLoading}
            >
              Back
            </button>
          </div>
          {selectedEmployee && (
            <div className="application-content">
              <div className="application-form">
                <div className="form-content">
                  <div className="form-group">
                    <label>Employee Name:</label>
                    <span>{selectedEmployee.name}</span>
                  </div>
                  <div className="form-group">
                    <label>Rank:</label>
                    <span>{selectedEmployee.rank}</span>
                  </div>
                  <div className="form-group">
                    <label>Section:</label>
                    <span>{selectedEmployee.section}</span>
                  </div>
                  <div className="form-group">
                    <label>Trade/Designation:</label>
                    <span>{selectedEmployee.trade}</span>
                  </div>
                  <div className="form-group">
                    <label>Type of Leave:</label>
                    <span>{selectedEmployee.type}</span>
                  </div>
                  <div className="form-group">
                    <label>From Date:</label>
                    <span>{selectedEmployee.fromDate}</span>
                  </div>
                  <div className="form-group">
                    <label>To Date:</label>
                    <span>{selectedEmployee.toDate}</span>
                  </div>
                  <div className="form-group">
                    <label>Days Requested:</label>
                    <span>{selectedEmployee.daysRequested}</span>
                  </div>
                  <div className="form-group">
                    <label>Reason:</label>
                    <span>{selectedEmployee.reason}</span>
                  </div>
                  <div className="form-group">
                    <label>Address on Leave:</label>
                    <span>{selectedEmployee.address}</span>
                  </div>
                  <div className="form-group">
                    <label>Recommendation:</label>
                    <span>{selectedEmployee.recommendation}</span>
                  </div>
                  <div className="form-group">
                    <label>Section Officer:</label>
                    <span>{selectedEmployee.sectionOfficer}</span>
                  </div>
                  <div className="form-actions">
                    {selectedEmployee.status === "Pending" && (
                      <>
                        <button 
                          className="submit-button"
                          onClick={() => handleDecision(selectedEmployee.id, "Approved")}
                          disabled={isLoading}
                        >
                          Approve
                        </button>
                        <button 
                          className="update-button"
                          onClick={() => handleDecision(selectedEmployee.id, "Rejected")}
                          disabled={isLoading}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button 
                      className="print-button"
                      onClick={() => handlePrint(selectedEmployee)}
                      disabled={isLoading}
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
              <div className="right-panel">
                <div className="leave-history">
                  <h3>Employee Leave History</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Type of Leave</th>
                        <th>Days Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEmployee.history.map((record, index) => (
                        <tr key={index}>
                          <td>{record.fromDate}</td>
                          <td>{record.toDate}</td>
                          <td>{record.type}</td>
                          <td>{record.takenDays}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="leave-balance">
                  <h3>Employee Leave Balance</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Type of Leave</th>
                        <th>Cumulative Total</th>
                        <th>Leaves Taken</th>
                        <th>Remaining Leaves</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEmployee.leaveBalance.map((balance, index) => (
                        <tr key={index}>
                          <td>{balance.type}</td>
                          <td>{balance.total}</td>
                          <td>{balance.taken}</td>
                          <td>{balance.remaining}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

Notification.propTypes = {
  message: PropTypes.string.isRequired
};

LeaveManagement.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      section: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      rank: PropTypes.string.isRequired,
      trade: PropTypes.string.isRequired,
      leaveType: PropTypes.string.isRequired,
      recommendationStatus: PropTypes.string.isRequired,
      fromDate: PropTypes.string.isRequired,
      toDate: PropTypes.string.isRequired,
      daysRequested: PropTypes.number.isRequired,
      reason: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      recommendation: PropTypes.string.isRequired,
      sectionOfficer: PropTypes.string.isRequired,
      sectionOfficerSignature: PropTypes.string,
      recommendationDate: PropTypes.string,
      estOfficerSignature: PropTypes.string,
      approvalDate: PropTypes.string,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          fromDate: PropTypes.string.isRequired,
          toDate: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          takenDays: PropTypes.number.isRequired,
        })
      ).isRequired,
      leaveBalance: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          total: PropTypes.number.isRequired,
          taken: PropTypes.number.isRequired,
          remaining: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ),
};

export default LeaveManagement;