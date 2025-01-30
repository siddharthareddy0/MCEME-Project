import React, { useState } from "react";
import "./LeaveManagement.css";

const LeaveManagement = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      gpf: "12345",
      rank: "Captain",
      sec: "A",
      trade: "Engineer",
      type: "EL",
      fromDate: "2025-01-01",
      toDate: "2025-01-05",
      daysRequested: 5,
      recommendation: "Recommended",
      sectionOfficer: "Lt. Smith",
      status: "Pending",
      history: [
        { fromDate: "2024-05-10", toDate: "2024-05-15", type: "CL" },
        { fromDate: "2023-12-01", toDate: "2023-12-05", type: "EL" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      gpf: "67890",
      rank: "Sergeant",
      sec: "B",
      trade: "Technician",
      type: "CML",
      fromDate: "2025-01-10",
      toDate: "2025-01-20",
      daysRequested: 10,
      recommendation: "Not Recommended",
      sectionOfficer: "Sgt. Brown",
      status: "Pending",
      history: [
        { fromDate: "2024-06-20", toDate: "2024-06-30", type: "SPL" },
        { fromDate: "2023-08-15", toDate: "2023-08-25", type: "EL" },
      ],
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDecision = (id, decision) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === id ? { ...app, status: decision } : app
      )
    );
  };

  const toggleHistory = (employee) => {
    setSelectedEmployee(selectedEmployee === employee ? null : employee);
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
          <tr><th>GPF/PRAN No</th><td>${app.gpf}</td></tr>
          <tr><th>Rank</th><td>${app.rank}</td></tr>
          <tr><th>Section</th><td>${app.sec}</td></tr>
          <tr><th>Trade/Designation</th><td>${app.trade}</td></tr>
          <tr><th>Type of Leave</th><td>${app.type}</td></tr>
          <tr><th>From Date</th><td>${app.fromDate}</td></tr>
          <tr><th>To Date</th><td>${app.toDate}</td></tr>
          <tr><th>Days Requested</th><td>${app.daysRequested}</td></tr>
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
      {selectedEmployee ? (
        <div>
          <button className="back-button" onClick={() => setSelectedEmployee(null)}>Back</button>
          <h3>{selectedEmployee.name}'s Leave History</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>From Date</th>
                <th>To Date</th>
                <th>Type of Leave</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee.history.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.fromDate}</td>
                  <td>{entry.toDate}</td>
                  <td>{entry.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="title">Leave Management - Industrial and Non-Industrial Personnel</h1>
          <div className="leave-table-container">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>GPF/PRAN No</th>
                  <th>Rank</th>
                  <th>Section</th>
                  <th>Trade/Designation</th>
                  <th>Type of Leave</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Days Requested</th>
                  <th>Recommendation</th>
                  <th>Section Officer</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="clickable" onClick={() => toggleHistory(app)}>
                      {app.name}
                    </td>
                    <td>{app.gpf}</td>
                    <td>{app.rank}</td>
                    <td>{app.sec}</td>
                    <td>{app.trade}</td>
                    <td>{app.type}</td>
                    <td>{app.fromDate}</td>
                    <td>{app.toDate}</td>
                    <td>{app.daysRequested}</td>
                    <td>{app.recommendation}</td>
                    <td>{app.sectionOfficer}</td>
                    <td>{app.status}</td>
                    <td>
                      <div className="action-buttons">
                        {app.status === "Pending" && (
                          <>
                            <button className="approve-btn" onClick={() => handleDecision(app.id, "Approved")}>
                              Approve
                            </button>
                            <button className="reject-btn" onClick={() => handleDecision(app.id, "Rejected")}>
                              Reject
                            </button>
                          </>
                        )}
                        <button className="print-btn" onClick={() => handlePrint(app)}>Print</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;