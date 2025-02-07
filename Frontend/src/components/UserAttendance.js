import React, { useState, useEffect } from 'react';
import './attendance.css';
import { FaPrint } from 'react-icons/fa';
import useAttendanceStore from './attendanceStore';

const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};

function UserAttendance({ userFaculty }) {
  const attendanceData = useAttendanceStore(state => state.attendanceData[userFaculty] || []);
  const updateAttendance = useAttendanceStore(state => state.updateAttendance);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [tempAttendanceData, setTempAttendanceData] = useState([]);

  // Update tempAttendanceData when attendanceData changes
  useEffect(() => {
    setTempAttendanceData(attendanceData);
  }, [attendanceData]);

  const formatMilitaryDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = (id, newStatus) => {
    setTempAttendanceData(current => 
      current.map(row => row.id === id ? { ...row, status: newStatus } : row)
    );
    // Update store immediately
    updateAttendance(userFaculty, id, { status: newStatus });
  };

  const handleRemarksChange = (id, newRemarks) => {
    setTempAttendanceData(current => 
      current.map(row => row.id === id ? { ...row, remarks: newRemarks } : row)
    );
    // Update store immediately
    updateAttendance(userFaculty, id, { remarks: newRemarks });
  };

  const handleSubmit = () => {
    // Show notification
    setNotificationMessage('Attendance updated successfully!');
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  };

  return (
    <div className="attendance-container">
      {notificationMessage && <Notification message={notificationMessage} />}
      <div className="detail-view-container">
        <div className="table-head">
          <h2>{userFaculty} STAFF PARADE STATE AS ON {formatMilitaryDate(new Date())}</h2>
          <button onClick={handlePrint} className="print-button no-print">
            <FaPrint /> Print
          </button>
        </div>
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
                        value={row.remarks}
                        onChange={(e) => handleRemarksChange(row.id, e.target.value)}
                        placeholder="Enter remarks"
                        className="remarks-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No attendance details found for {userFaculty}.</p>
            </div>
          )}
        </div>
        {tempAttendanceData.length > 0 && (
          <div className="submit-section">
            <button onClick={handleSubmit} className="attendance-submit">
              Submit Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAttendance;
