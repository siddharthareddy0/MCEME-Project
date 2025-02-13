import React, { useState, useEffect, useMemo } from 'react';
import './attendance.css';
import { FaPrint, FaArrowLeft } from 'react-icons/fa';
import useAttendanceStore from './attendanceStore';

const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};

function UserAttendance({ userFaculty }) {
  const facultyData = useAttendanceStore(state => state.attendanceData[userFaculty]);
  const updateAttendance = useAttendanceStore(state => state.updateAttendance);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedSubFaculty, setSelectedSubFaculty] = useState(null);
  const [tempAttendanceData, setTempAttendanceData] = useState([]);

  // Calculate summary data for sub-faculties
  const subFacultySummary = useMemo(() => {
    if (!facultyData?.isParent) return [];
    if (!facultyData?.subFaculties) return [];
    
    return Object.entries(facultyData.subFaculties).map(([facName, members], index) => {
      if (!Array.isArray(members)) return null;
      
      const strength = members.length;
      const present = members.filter(m => m.status === "Present").length;
      const leave = members.filter(m => m.status === "Leave").length;
      const absent = members.filter(m => m.status === "Absent").length;
      const wOff = members.filter(m => m.status === "W/Off").length;

      return {
        id: index + 1,
        facSecWing: facName,
        totalStrength: strength,
        present,
        leave,
        absent,
        wOff
      };
    }).filter(Boolean); // Remove any null entries
  }, [facultyData]);

  // Calculate totals for sub-faculties
  const totals = useMemo(() => {
    if (!subFacultySummary.length) return null;
    
    return subFacultySummary.reduce((acc, row) => ({
      totalStrength: acc.totalStrength + row.totalStrength,
      present: acc.present + row.present,
      leave: acc.leave + row.leave,
      absent: acc.absent + row.absent,
      wOff: acc.wOff + row.wOff
    }), { totalStrength: 0, present: 0, leave: 0, absent: 0, wOff: 0 });
  }, [subFacultySummary]);

  useEffect(() => {
    if (facultyData) {
      if (facultyData.isParent) {
        setTempAttendanceData([]);
      } else {
        setTempAttendanceData(facultyData || []);
      }
    }
  }, [facultyData]);

  const formatMilitaryDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const createPrintIframe = (content) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow.document;
    doc.write('<html><head><title>Attendance Report</title>');
    doc.write('<style>');
    doc.write(`
      @media print {
        @page { 
          size: A4; 
          margin: 1.5cm; 
        }
        body { 
          margin: 0; 
          padding: 0;
          font-family: Arial, sans-serif;
        }
        table { 
          width: 100%; 
          border-collapse: separate;
          border-spacing: 0;
          margin-bottom: 25px;
          page-break-inside: avoid;
          border: 0.5px solid black;
        }
        th, td { 
          border: 0.5px solid black;
          padding: 8px; 
          text-align: left; 
          font-size: 12px;
        }
        th {
          font-weight: bold;
          background-color: #f5f5f5;
        }
        h2 { 
          text-align: center; 
          margin: 20px 0;
          font-size: 14px;
          text-transform: uppercase;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .total-row td {
          font-weight: bold;
          background-color: #f5f5f5;
        }
      }
    `);
    doc.write('</style></head><body>');
    doc.write(content);
    doc.write('</body></html>');
    doc.close();
    
    iframe.contentWindow.print();
    iframe.onafterprint = () => {
      document.body.removeChild(iframe);
    };
  };

  const handlePrint = () => {
    // If a sub-faculty is selected, print its details
    if (selectedSubFaculty && tempAttendanceData.length) {
      const content = `
        <div class="section">
          <h2><u>${selectedSubFaculty} STAFF PARADE STATE AS ON ${formatMilitaryDate(new Date())}</u></h2>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Trade/Fac</th>
                <th>Name</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${tempAttendanceData.map((member, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${member.tradeFac || ''}</td>
                  <td>${member.name}</td>
                  <td>${member.status}</td>
                  <td>${member.remarks || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>`;
      createPrintIframe(content);
      return;
    }

    // Otherwise, print the main summary table
    const summaryData = Object.entries(facultyData.subFaculties).map(([subFacName, members], index) => {
      const strength = members.length;
      const present = members.filter(m => m.status === "Present").length;
      const leave = members.filter(m => m.status === "Leave").length;
      const absent = members.filter(m => m.status === "Absent").length;
      const wOff = members.filter(m => m.status === "W/Off").length;

      return {
        id: index + 1,
        facSecWing: subFacName,
        totalStrength: strength,
        present,
        leave,
        absent,
        wOff
      };
    });

    // Calculate totals
    const totals = summaryData.reduce((acc, curr) => ({
      totalStrength: acc.totalStrength + curr.totalStrength,
      present: acc.present + curr.present,
      leave: acc.leave + curr.leave,
      absent: acc.absent + curr.absent,
      wOff: acc.wOff + curr.wOff
    }), { totalStrength: 0, present: 0, leave: 0, absent: 0, wOff: 0 });

    const content = `
      <div class="section">
        <h2><u>${userFaculty} STAFF PARADE STATE AS ON ${formatMilitaryDate(new Date())}</u></h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Fac/Sec/Wing</th>
              <th>Total Strength</th>
              <th>Present</th>
              <th>Leave</th>
              <th>Absent</th>
              <th>W/Off</th>
            </tr>
          </thead>
          <tbody>
            ${summaryData.map(row => `
              <tr>
                <td>${row.id}</td>
                <td>${row.facSecWing}</td>
                <td>${row.totalStrength}</td>
                <td>${row.present}</td>
                <td>${row.leave}</td>
                <td>${row.absent}</td>
                <td>${row.wOff}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="2">Total</td>
              <td>${totals.totalStrength}</td>
              <td>${totals.present}</td>
              <td>${totals.leave}</td>
              <td>${totals.absent}</td>
              <td>${totals.wOff}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    createPrintIframe(content);
  };

  const handlePrintAll = () => {
    if (!facultyData?.subFaculties) return;
    
    const content = Object.entries(facultyData.subFaculties).map(([subFacName, members]) => 
      members.length ? `
      <div class="section">
        <h2><u>${subFacName} STAFF PARADE STATE AS ON ${formatMilitaryDate(new Date())}</u></h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Trade/Fac</th>
              <th>Name</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${members.map((member, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${member.tradeFac || ''}</td>
                <td>${member.name}</td>
                <td>${member.status}</td>
                <td>${member.remarks || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>` : ''
    ).filter(content => content).join('');
    
    createPrintIframe(content);
  };

  const handleStatusChange = (id, newStatus) => {
    try {
      if (facultyData.isParent && selectedSubFaculty) {
        setTempAttendanceData(current => 
          current.map(row => row.id === id ? { ...row, status: newStatus } : row)
        );
        updateAttendance(userFaculty, selectedSubFaculty, id, { status: newStatus });
      } else {
        setTempAttendanceData(current => 
          current.map(row => row.id === id ? { ...row, status: newStatus } : row)
        );
        updateAttendance(userFaculty, null, id, { status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setNotificationMessage('Error updating status. Please try again.');
    }
  };

  const handleRemarksChange = (id, newRemarks) => {
    try {
      if (facultyData.isParent && selectedSubFaculty) {
        setTempAttendanceData(current => 
          current.map(row => row.id === id ? { ...row, remarks: newRemarks } : row)
        );
        updateAttendance(userFaculty, selectedSubFaculty, id, { remarks: newRemarks });
      } else {
        setTempAttendanceData(current => 
          current.map(row => row.id === id ? { ...row, remarks: newRemarks } : row)
        );
        updateAttendance(userFaculty, null, id, { remarks: newRemarks });
      }
    } catch (error) {
      console.error('Error updating remarks:', error);
      setNotificationMessage('Error updating remarks. Please try again.');
    }
  };

  const handleSubFacultyClick = (subFaculty) => {
    try {
      setSelectedSubFaculty(subFaculty);
      const subFacultyData = facultyData?.subFaculties?.[subFaculty] || [];
      setTempAttendanceData(subFacultyData);
    } catch (error) {
      console.error('Error selecting sub-faculty:', error);
      setNotificationMessage('Error loading sub-faculty data. Please try again.');
    }
  };

  const handleBackToMain = () => {
    setSelectedSubFaculty(null);
    setTempAttendanceData([]);
  };

  const handleSubmit = () => {
    setNotificationMessage('Attendance updated successfully!');
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  };

  // If faculty data is not found
  if (!facultyData) {
    return (
      <div className="attendance-container">
        <div className="error-message">
          <h2>Faculty Not Found</h2>
          <p>No data available for faculty: {userFaculty}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="attendance-container">
      {notificationMessage && <Notification message={notificationMessage} />}
      <div className="detail-view-container">
        <div className="table-head">
          <h2>
            {selectedSubFaculty ? 
              `${selectedSubFaculty} STAFF PARADE STATE AS ON ${formatMilitaryDate(new Date())}` :
              `${userFaculty} STAFF PARADE STATE AS ON ${formatMilitaryDate(new Date())}`
            }
          </h2>
          {!selectedSubFaculty && userFaculty && facultyData.isParent && (
            <div className="button-group">
              <button onClick={handlePrint} className="print-button3 no-print">
                <FaPrint /> Print
              </button>
              <button onClick={handlePrintAll} className="print-button3 no-print" style={{ marginLeft: '10px' }}>
                <FaPrint /> Print All
              </button>
            </div>
          )}
          {!selectedSubFaculty && userFaculty && !facultyData.isParent && (
            <button onClick={handlePrint} className="print-button3 no-print">
              <FaPrint /> Print
            </button>
          )}
          {selectedSubFaculty && (
            <div className="button-group">
              <button onClick={handleBackToMain} className="back-button3 no-print">
                <FaArrowLeft /> Back
              </button>
              <button onClick={handlePrint} className="print-button3 no-print">
                <FaPrint /> Print
              </button>
            </div>
          )}
        </div>

        {facultyData.isParent && !selectedSubFaculty ? (
          <div className="main-table-container">
            <div className="table-wrapper">
              {subFacultySummary.length > 0 ? (
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Fac/Sec/Wing</th>
                      <th>Total Strength</th>
                      <th>Present</th>
                      <th>Leave</th>
                      <th>Absent</th>
                      <th>W/Off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subFacultySummary.map((row) => (
                      <tr key={row.id} onClick={() => handleSubFacultyClick(row.facSecWing)} style={{ cursor: 'pointer' }}>
                        <td>{row.id}</td>
                        <td>{row.facSecWing}</td>
                        <td>{row.totalStrength}</td>
                        <td>{row.present}</td>
                        <td>{row.leave}</td>
                        <td>{row.absent}</td>
                        <td>{row.wOff}</td>
                      </tr>
                    ))}
                    {totals && (
                      <tr className="total-row">
                        <td colSpan={2}>Total</td>
                        <td>{totals.totalStrength}</td>
                        <td>{totals.present}</td>
                        <td>{totals.leave}</td>
                        <td>{totals.absent}</td>
                        <td>{totals.wOff}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <p>No sub-faculty data available.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="table-wrapper">
            {tempAttendanceData.length > 0 ? (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Trade/Fac</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {tempAttendanceData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.tradeFac}</td>
                      <td>{row.name}</td>
                      <td>
                        <select 
                          value={row.status}
                          onChange={(e) => handleStatusChange(row.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="None">None</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Leave">Leave</option>
                          <option value="W/Off">W/Off</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.remarks || ''}
                          onChange={(e) => handleRemarksChange(row.id, e.target.value)}
                          className="remarks-input"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No attendance data available.</p>
            )}
            {tempAttendanceData.length > 0 && (
              <button onClick={handleSubmit} className="attendance-submit no-print">
                Submit Attendance
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAttendance;
