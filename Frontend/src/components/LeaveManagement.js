import React, { useState } from "react";
import "./LeaveManagement.css";

const LeaveManagement = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      section: "A",
      type: "EL",
      status: "Pending",
      rank: "Captain",
      trade: "Engineer",
      fromDate: "2025-01-01",
      toDate: "2025-01-05",
      daysRequested: 5,
      reason: "Family function",
      address: "123 Main St, Bangalore",
      recommendation: "Recommended",
      sectionOfficer: "Lt. Smith",
      history: [
        { fromDate: "2024-05-10", toDate: "2024-05-15", type: "CL", takenDays: 5 },
        { fromDate: "2023-12-01", toDate: "2023-12-05", type: "EL", takenDays: 5 },
      ],
      leaveBalance: [
        { type: "Earned Leave", total: 30, taken: 15, remaining: 15 },
        { type: "Casual Leave", total: 15, taken: 8, remaining: 7 },
        { type: "Sick Leave", total: 10, taken: 2, remaining: 8 },
      ],
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowApplicationForm(true);
  };

  const handleBack = () => {
    setShowApplicationForm(false);
    setSelectedEmployee(null);
  };

  const handleDecision = (id, decision) => {
    // Show confirmation popup
    const confirmMessage = `Are you sure you want to ${decision.toLowerCase()} this leave application?`;
    if (window.confirm(confirmMessage)) {
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { ...app, status: decision } : app
        )
      );
      // Update selectedEmployee status
      setSelectedEmployee(prev => ({
        ...prev,
        status: decision
      }));
      // Show success message
      alert(`Leave application has been ${decision.toLowerCase()}`);
    }
  };

  const handlePrint = (app) => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Leave Application</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #556b2f; color: white; }
            .print-section { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h2>Leave Application Form</h2>
          <table>
            <tr><th>Employee Name</th><td>${app.name}</td></tr>
            <tr><th>Rank</th><td>${app.rank}</td></tr>
            <tr><th>Section</th><td>${app.section}</td></tr>
            <tr><th>Trade/Designation</th><td>${app.trade}</td></tr>
            <tr><th>Type of Leave</th><td>${app.type}</td></tr>
            <tr><th>From Date</th><td>${app.fromDate}</td></tr>
            <tr><th>To Date</th><td>${app.toDate}</td></tr>
            <tr><th>Days Requested</th><td>${app.daysRequested}</td></tr>
            <tr><th>Reason</th><td>${app.reason}</td></tr>
            <tr><th>Address on Leave</th><td>${app.address}</td></tr>
            <tr><th>Recommendation</th><td>${app.recommendation}</td></tr>
            <tr><th>Section Officer</th><td>${app.sectionOfficer}</td></tr>
            <tr><th>Status</th><td>${app.status}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="leave-management">
      {!showApplicationForm ? (
        <div className="leave-table-container">
            <h2>INDUSTRIAL / NON-INDUSTRIAL PERSONNEL</h2>
          <table className="leave-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Employee Name</th>
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
                    <button className="name-button" onClick={() => handleEmployeeClick(app)}>
                      {app.name}
                    </button>
                  </td>
                  <td>{app.section}</td>
                  <td>{app.type}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="application-page">
          <div className="application-header">
            <h3>Leave Application Form</h3>
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          </div>
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
                  {selectedEmployee.status === "Pending" ? (
                    <>
                      <button onClick={() => handleDecision(selectedEmployee.id, "Approved")}>
                        Approve
                      </button>
                      <button onClick={() => handleDecision(selectedEmployee.id, "Rejected")}>
                        Reject
                      </button>
                    </>
                  ) : null}
                  <button onClick={() => handlePrint(selectedEmployee)}>
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
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;