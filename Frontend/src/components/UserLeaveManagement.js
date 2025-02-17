import React, { useState, useRef } from "react";
import "./UserLeaveManagement.css";

const LeaveHistory = ({ history, employeeNo }) => {
  const [selectedType, setSelectedType] = useState('');
  const leaveTypes = ['EL', 'ML', 'CL', 'RH', 'CCL', 'PL', 'Extension of Leave'];

  const filteredHistory = selectedType 
    ? history.filter(entry => entry.type === selectedType)
    : history;

    // const handlePrint = () => {
    //   const style = `
    //     <style>
    //       @media print {
    //         body * {
    //           visibility: hidden;
    //         }
    //         #printSection, #printSection * {
    //           visibility: visible;
    //         }
    //         #printSection {
    //           position: absolute;
    //           left: 0;
    //           top: 0;
    //           width: 100%;
    //         }
    //         table {
    //           width: 100%;
    //           border-collapse: collapse;
    //         }
    //         th, td {
    //           border: 1px solid black;
    //           padding: 8px;
    //           text-align: center;
    //         }
    //         .header {
    //           text-align: center;
    //           margin-bottom: 20px;
    //         }
    //         .title {
    //           font-size: 24px;
    //           font-weight: bold;
    //           margin-bottom: 10px;
    //         }
    //         .subtitle {
    //           font-size: 20px;
    //           margin-bottom: 20px;
    //         }
    //         .pers-info {
    //           margin: 10px 0;
    //           font-weight: bold;
    //         }
    //       }
    //     </style>
    //   `;
  
    //   const printContent = `
    //     ${style}
    //     <div id="printSection">
    //       <div class="header">
    //         <div class="title">MILITARY COLLEGE OF EME, SECUNDERABAD</div>
    //         <div class="subtitle">${selectedType ?` ${selectedType} LEAVE RECORD `: 'LEAVE RECORD'}</div>
    //       </div>
    //       <div class="pers-info">PERS NO: ${employeeNo}</div>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Days Entitled</th>
    //             <th>From</th>
    //             <th>To</th>
    //             <th>Type of Leave</th>
    //             <th>No of Days</th>
    //             <th>Balance</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           ${filteredHistory.map(entry => `
    //             <tr>
    //               <td>${entry.daysEntitled}</td>
    //               <td>${entry.fromDate}</td>
    //               <td>${entry.toDate}</td>
    //               <td>${entry.type}</td>
    //               <td>${entry.takenDays}</td>
    //               <td>${entry.balance}</td>
    //             </tr>
    //           `).join('')}
    //         </tbody>
    //       </table>
    //     </div>
    //   `;
    // // Create a hidden iframe
    // const iframe = document.createElement('iframe');
    // iframe.style.display = 'none';
    // document.body.appendChild(iframe);
    
    // // Write the content to iframe and print
    // iframe.contentWindow.document.write(printContent);
    // iframe.contentWindow.document.close();
    
    // iframe.contentWindow.focus();
    // iframe.contentWindow.print();
    
    // Remove iframe after printing
  //   setTimeout(() => {
  //     document.body.removeChild(iframe);
  //   }, 500);
  // };

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
        {/* <button onClick={handlePrint} className="userleave-print-button">
          Print
        </button> */}
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

const getEstOfficerStamp = (status) => {
  if (status === 'Approved') {
    return `
      <div style="
        border: 2px solid #173B45;
        border-radius: 50%;
        padding: 10px;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-weight: bold;
        color: #173B45;
        text-align: center;
        font-size: 10px;
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
        padding: 10px;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-weight: bold;
        color: #dc3545;
        text-align: center;
        font-size: 10px;
      ">
        REJECTED<br>
        Est Officer<br>
        MCEME
      </div>
    `;
  }
  return '';
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
    try {
      if (!request) {
        throw new Error("Invalid request data for printing");
      }

      // Create a hidden iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Write content to iframe
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
                padding: 30px;
                width: 100%;
                max-width: 900px;
              }
              .print-header {
                text-align: center;
                margin-bottom: 10px;
                padding: 20px 0;
              }
              .print-header h2 {
                margin: 10px 0;
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 1px;
                text-decoration: underline;
                text-underline-offset: 5px;
              }
              .print-form {
                page-break-inside: avoid;
                width: 100%;
              }
              .form-row {
                margin: 25px 0;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: flex-start;
                flex-wrap: nowrap;
              }
              .form-row span:not(.underline) {
                white-space: nowrap;
                padding-right: 10px;
                font-size: 16px;
              }
              .underline {
                border-bottom: 1px solid black;
                padding: 2px 5px;
                flex: 1;
                min-width: 100px;
                margin: 0 5px;
                font-size: 16px;
              }
              .form-row-group {
                display: flex;
                align-items: center;
                flex: 1;
              }
              .signature-row {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: 100px;
                align-items: flex-start;
              }
              .signature-left {
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .signature-right {
                text-align: center;
                min-width: 250px;
              }
              .signature-box {
                margin-bottom: 20px;
              }
              .part-2 {
                margin-top: 40px;
                text-align: center;
                page-break-inside: avoid;
                padding-top: 20px;
              }
              .part-2 h3 {
                font-size: 18px;
                font-weight: bold;
                text-decoration: underline;
                text-underline-offset: 5px;
                margin: 15px 0;
                text-transform: uppercase;
              }
            </style>
          </head>
          <body>
            <div class="print-content">
              <div class="print-header">
                <h2>LEAVE APPLICATION</h2>
                <h2>INDUSTRIAL AND NON INDUSTRIAL PERSONNEL</h2>
              </div>
              
              <div class="print-form">
                <div class="form-row">
                  <span>No</span>
                  <span class="underline" data-field="no">${request.persNo || ''}</span>
                  <span>Rank</span>
                  <span class="underline" data-field="rank">${request.rank || ''}</span>
                  <span>Name</span>
                  <span class="underline" data-field="name">${request.name || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>Sec</span>
                  <span class="underline" data-field="section">${request.section || ''}</span>
                  <span>here by request for</span>
                  <span class="underline">
                    <span class="leave-type selected">${request.type}</span> leave
                  </span>
                </div>
                
                <div class="form-row">
                  <span>for</span>
                  <span class="underline" data-field="days">${request.daysRequested || ''}</span>
                  <span>days from</span>
                  <span class="underline" data-field="date">${request.fromDate || ''}</span>
                  <span>to</span>
                  <span class="underline" data-field="date">${request.toDate || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>Reason</span>
                  <span class="underline" data-field="reason" style="flex: 2">${request.reason || ''}</span>
                </div>
                
                <div class="form-row">
                  <span>Address on leave:</span>
                  <span class="underline" data-field="address" style="flex: 2">${request.address || ''}</span>
                </div>

                <div class="part-2">
                  <h3>PART II</h3>
                  <div class="recommendation-row">
                    <span class="recommend-option selected">${request.recommendation || ''}</span>
                  </div>
                  
                  <div class="signature-row">
                    <div class="signature-left">
                      <span>Dated:</span>
                      <span class="underline" data-field="date">${request.recommendationDate || 'Pending'}</span>
                    </div>
                    <div class="signature-right">
                      <div class="signature-box">${request.sectionOfficerSignature || ''}</div>
                      <div class="signature-line">(Signature of section officer)</div>
                    </div>
                  </div>
                </div>

                <div class="part-2">
                  <h3>PART III</h3>
                  <div class="approval-row">
                    <span class="approval-status">${request.status}</span>
                  </div>

                  <div class="signature-row">
                    <div class="signature-left">
                      <span>Dated:</span>
                      <span class="underline" data-field="date">${request.approvalDate || 'Pending'}</span>
                    </div>
                    <div class="signature-right">
                      <div class="signature-box">
                        ${getEstOfficerStamp(request.status)}
                      </div>
                      <div class="signature-line">(Signature of est officer(Civ))</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
      
      iframe.contentDocument.write(printContent);
      iframe.contentDocument.close();

      // Print and remove iframe
      iframe.contentWindow.onafterprint = () => {
        document.body.removeChild(iframe);
      };
      
      iframe.contentWindow.print();

    } catch (err) {
      console.error(`Failed to print: ${err.message}`);
    }
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
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.persNo}>
                <td>{request.persNo}</td>
                <td>{request.name}</td>
                <td>{request.rank}</td>
                <td>{request.section}</td>
                <td>{request.type}</td>
                {/* <td>{request.status}</td> */}

                <td className={ `status-${request.status.toLowerCase()} `}>
                  {request.status}
                </td>
                {(statusFilter === 'Approved' || statusFilter === 'Rejected' || !statusFilter) && (
                  <td>
                    <button onClick={() => handlePrint(request)} className="userleave-print-button">
                      Print
                    </button>
                  </td>
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

    // Only show tables if employeeNo has a value and is at least 3 characters
    if (name === 'employeeNo') {
      setShowTables(value.length >= 3);
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

          <div className="userleave-form-row full-width">
            <label>Reason for Leave:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="userleave-form-row full-width">
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

          <div className="userleave-form-actions full-width">
            <button type="submit" className="userleave-submit-button">
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {showTables && (
        <div className={`userleave-tables-section ${showTables ? 'show' : ''}`}>
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