import React, { useState, useMemo } from 'react';
import './attendance.css';
import { FaPrint, FaArrowLeft } from 'react-icons/fa';
import useAttendanceStore from './attendanceStore';

function Attendance() {
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedFac, setSelectedFac] = useState(null);
  
  const attendanceData = useAttendanceStore(state => state.attendanceData);
  
  // Memoize the summary calculation
  const mainTableData = useMemo(() => {
    return Object.entries(attendanceData).map(([facName, members], index) => {
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
    });
  }, [attendanceData]);

  // Memoize the totals calculation
  const totals = useMemo(() => {
    return mainTableData.reduce((acc, row) => ({
      totalStrength: acc.totalStrength + row.totalStrength,
      present: acc.present + row.present,
      leave: acc.leave + row.leave,
      absent: acc.absent + row.absent,
      wOff: acc.wOff + row.wOff
    }), { totalStrength: 0, present: 0, leave: 0, absent: 0, wOff: 0 });
  }, [mainTableData]);

  const formatMilitaryDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleFacClick = (fac) => {
    setSelectedFac(fac);
    setShowDetailView(true);
  };

  const handleBack = () => {
    setShowDetailView(false);
    setSelectedFac(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="attendance-container">
      {!showDetailView ? (
        <div className="main-table-container">
          <div className="table-head">
            <h2>PARADE STATE FOR {formatMilitaryDate(new Date())} OF CDEs MCEME</h2>
            <button onClick={handlePrint} className="print-button no-print">
              <FaPrint /> Print
            </button>
          </div>
          <div className="table-wrapper">
            {mainTableData.length > 0 ? (
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
                  {mainTableData.map((row) => (
                    <tr key={row.id} onClick={() => handleFacClick(row.facSecWing)} style={{ cursor: 'pointer' }}>
                      <td>{row.id}</td>
                      <td>{row.facSecWing}</td>
                      <td>{row.totalStrength}</td>
                      <td>{row.present}</td>
                      <td>{row.leave}</td>
                      <td>{row.absent}</td>
                      <td>{row.wOff}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan={2}>Total</td>
                    <td>{totals.totalStrength}</td>
                    <td>{totals.present}</td>
                    <td>{totals.leave}</td>
                    <td>{totals.absent}</td>
                    <td>{totals.wOff}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="no-results">
                <p>No attendance details found for any faculty.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="detail-view-container">
          <div className="table-head">
            <h2>{selectedFac} STAFF PARADE STATE AS ON {formatMilitaryDate(new Date())}</h2>
            <div className="button-group">
              <button onClick={handleBack} className="back-button">
                <FaArrowLeft /> Back
              </button>
              <button onClick={handlePrint} className="print-button">
                <FaPrint /> Print
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            {attendanceData[selectedFac]?.length > 0 ? (
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
                  {attendanceData[selectedFac]?.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.tradeFac}</td>
                      <td>{row.name}</td>
                      <td>{row.status}</td>
                      <td>{row.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-results">
                <p>No attendance details found for {selectedFac}.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;