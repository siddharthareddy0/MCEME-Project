import React, { useState, useRef } from "react";
import "./UserLeaveManagement.css";

const LeaveHistory = ({ history, employeeNo }) => {
  const [selectedType, setSelectedType] = useState('');
  const leaveTypes = ['EL', 'ML', 'CL', 'RH', 'CCL', 'PL', 'Extension of Leave'];

  const filteredHistory = selectedType 
    ? history.filter(entry => entry.type === selectedType)
    : history;

  const handlePrint = () => {
    const style = `
      <style>
        @media print {
          body * {
            visibility: hidden;
          }
          #printSection, #printSection * {
            visibility: visible;
          }
          #printSection {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .subtitle {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .pers-info {
            margin: 10px 0;
            font-weight: bold;
          }
        }
      </style>
    `;

    const printContent = `
      ${style}
      <div id="printSection">
        <div class="header">
          <div class="title">MILITARY COLLEGE OF EME, SECUNDERABAD</div>
          <div class="subtitle">${selectedType ?` ${selectedType} LEAVE RECORD `: 'LEAVE RECORD'}</div>
        </div>
        <div class="pers-info">PERS NO: ${employeeNo}</div>
        <table>
          <thead>
            <tr>
              <th>Days Entitled</th>
              <th>From</th>
              <th>To</th>
              <th>Type of Leave</th>
              <th>No of Days</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            ${filteredHistory.map(entry => `
              <tr>
                <td>${entry.daysEntitled}</td>
                <td>${entry.fromDate}</td>
                <td>${entry.toDate}</td>
                <td>${entry.type}</td>
                <td>${entry.takenDays}</td>
                <td>${entry.balance}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Write the content to iframe and print
    iframe.contentWindow.document.write(printContent);
    iframe.contentWindow.document.close();
    
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    
    // Remove iframe after printing
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 500);
  };

  return (
    <div className="userleave-history-container">
      <div className="userleave-controls">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="userleave-filter-select"
        >
          <option value="">All Leave Types</option>
          {leaveTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button onClick={handlePrint} className="userleave-print-button">
          Print
        </button>
      </div>
      
      <div className="userleave-printable-content">
        <div className="userleave-print-only-header print-only">
          <h2 className="userleave-college-title">MILITARY COLLEGE OF EME, SECUNDERABAD</h2>
        </div>
        <h3 className="userleave-record-title">
          {selectedType ? `${selectedType} LEAVE RECORD ` : 'LEAVE RECORD '}
        </h3>
        <div className="userleave-pers-info">
          <div>PERS NO: {employeeNo}</div>
        </div>
        <table className="userleave-record-table">
          <thead>
            <tr>
              <th>Days Entitled</th>
              <th>From</th>
              <th>To</th>
              <th>Type of Leave</th>
              <th>No of Days</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory?.map((entry, index) => (
              <tr key={index}>
                <td>{entry.daysEntitled}</td>
                <td>{entry.fromDate}</td>
                <td>{entry.toDate}</td>
                <td>{entry.type}</td>
                <td>{entry.takenDays}</td>
                <td>{entry.balance}</td>
              </tr>
            ))}
            {filteredHistory?.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LeaveStatus = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [leaveRequests] = useState([
    {
      persNo: "123456",
      name: "John Doe",
      rank: "Major",
      section: "IT",
      type: "EL",
      status: "Approved"
    },
    {
      persNo: "789012",
      name: "Jane Smith",
      rank: "Captain",
      section: "Admin",
      type: "ML",
      status: "Pending"
    },
    {
      persNo: "345678",
      name: "Bob Wilson",
      rank: "Lieutenant",
      section: "Operations",
      type: "CL",
      status: "Rejected"
    }
  ]);

  const filteredRequests = statusFilter 
    ? leaveRequests.filter(request => request.status === statusFilter)
    : leaveRequests;

  const handlePrint = (request) => {
    // Implement print functionality for approved/rejected requests
    window.print();
  };

  return (
    <div className="userleave-history-container">
      <div className="userleave-controls">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="userleave-filter-select"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      
      <div className="userleave-printable-content">
        <div className="userleave-print-only-header print-only">
          <h2 className="userleave-college-title">MILITARY COLLEGE OF EME, SECUNDERABAD</h2>
        </div>
        <h3 className="userleave-record-title">
          {statusFilter ? ` ${statusFilter} LEAVE STATUS `: 'LEAVE STATUS'}
        </h3>
        <table className="userleave-attendance-table">
          <thead>
            <tr>
              <th>PERS NO</th>
              <th>Employee Name</th>
              <th>Rank</th>
              <th>Section</th>
              <th>Type of Leave</th>
              <th>Status</th>
              {(statusFilter === 'Approved' || statusFilter === 'Rejected' || !statusFilter) && (
                <th>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.persNo}</td>
                <td>{request.name}</td>
                <td>{request.rank}</td>
                <td>{request.section}</td>
                <td>{request.type}</td>
                <td className={ `status-${request.status.toLowerCase()} `}>
                  {request.status}
                </td>
                {(request.status === 'Approved' || request.status === 'Rejected') && (
                  <td>
                    <button onClick={() => handlePrint(request)} className="userleave-print-button">
                      Print
                    </button>
                  </td>
                )}
                {request.status === 'Pending' && statusFilter !== 'Approved' && statusFilter !== 'Rejected' && (
                  <td></td>
                )}
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};

const LeaveApplicationForm = () => {
  const [formData, setFormData] = useState({
    employeeNo: '',
    name: '',
    rank: '',
    section: '',
    trade: '',
    leaveType: '',
    numberOfDays: '',
    fromDate: '',
    toDate: '',
    reason: '',
    address: '',
    recommendation: '',
    sectionOfficerName: '',
  });

  const [showTables, setShowTables] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const leaveTypes = ['EL', 'ML', 'CL', 'RH', 'CCL', 'PL', 'Extension of Leave'];
  
  const tradeOptions = [
    'Barber', 'Book Binder', 'C&J', 'Cine Proj Mate', 'CMD Gde I', 
    'CMD Gde II', 'CMD OG', 'CMD Spl GDE', 'Cook', 'FBP', 'Fireman', 
    'Fitter', 'Foreman', 'Inst Mech', 'Lab Asst', 'Lab Attd', 'Lab Demo', 
    'LDC', 'LH (NT)', 'Machinist', 'Moulder', 'MTS (Chow)', 'MTS (Daftry)', 
    'MTS (Mali)', 'MTS (Msgr)', 'MTS (Sfwi)', 'O/Supdt', 'Painter & Dec', 
    'Pattern Maker', 'Photographer', 'Poster Artist', 'Snr Dtmn', 'Spvr (NT)', 
    'Steno Gde I', 'Steno Gde II', 'Store Keeper', 'Tailor', 'TCM', 'TCS', 
    'Tdsman Mate', 'UDC', 'Washerman'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'employeeNo' && value) {
      setShowTables(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear form and hide tables
    setFormData({
      employeeNo: '',
      name: '',
      rank: '',
      section: '',
      trade: '',
      leaveType: '',
      numberOfDays: '',
      fromDate: '',
      toDate: '',
      reason: '',
      address: '',
      recommendation: '',
      sectionOfficerName: '',
    });
    setShowTables(false);

    // Show notification
    setNotificationMessage('Form submitted successfully!');
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  };

  return (
    <div className="userleave-form-container">
      {notificationMessage && <Notification message={notificationMessage} />}
      <div className="userleave-form-section">
        <h2>Leave Application Form</h2>
        <form onSubmit={handleSubmit} className="userleave-form">
          <div className="userleave-form-row">
            <label>PERS NO:</label>
            <input
              type="text"
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>Rank:</label>
            <input
              type="text"
              name="rank"
              value={formData.rank}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>Section:</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>Trade/Designation:</label>
            <select
              name="trade"
              value={formData.trade}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Trade</option>
              {tradeOptions.map((trade) => (
                <option key={trade} value={trade}>{trade}</option>
              ))}
            </select>
          </div>

          <div className="userleave-form-row">
            <label>Type of Leave:</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="userleave-form-row">
            <label>No of Days:</label>
            <input
              type="number"
              name="numberOfDays"
              value={formData.numberOfDays}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>From Date:</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>To Date:</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>Reason for Leave:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>Address on Leave:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row">
            <label>Recommendation:</label>
            <select
              name="recommendation"
              value={formData.recommendation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Recommendation</option>
              <option value="recommended" style={{ color: '#333' }}>Recommended</option>
              <option value="not_recommended" style={{ color: '#333' }}>Not Recommended</option>
            </select>
          </div>

          {formData.recommendation === 'recommended' && (
            <div className="userleave-form-row">
              <label>Section Officer Name:</label>
              <input
                type="text"
                name="sectionOfficerName"
                value={formData.sectionOfficerName}
                onChange={handleInputChange}
                required
              />
              <div className="userleave-digital-stamp">
                <span>Digital Stamp</span>
              </div>
            </div>
          )}

          <div className="userleave-form-actions">
            <button type="submit" className="userleave-submit-button">
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {showTables && (
        <div className="userleave-tables-section">
          <LeaveHistory
            history={[
              { fromDate: '2024-01-01', toDate: '2024-01-05', type: 'EL', takenDays: 5, daysEntitled: 10, balance: 5 },
              { fromDate: '2024-02-01', toDate: '2024-02-03', type: 'CL', takenDays: 3, daysEntitled: 5, balance: 2 },
            ]}
            employeeNo={formData.employeeNo}
          />
        </div>
      )}
    </div>
  );
};

const UserLeaveManagement = ({ option }) => {
  return (
    <div className="userleave-management">
      <div className="userleave-main-content">
        {option === 'application' && <LeaveApplicationForm />}
        {option === 'status' && <LeaveStatus />}
      </div>
    </div>
  );
};

export default UserLeaveManagement;