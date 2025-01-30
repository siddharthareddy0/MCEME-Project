import React, { useState, useEffect } from 'react';
import './attendance.css';
import { FaPrint, FaArrowLeft } from 'react-icons/fa';

function Attendance() {
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedFac, setSelectedFac] = useState(null);
  const [mainTableData, setMainTableData] = useState([]);
  const [totals, setTotals] = useState({
    totalStrength: 0,
    present: 0,
    leave: 0,
    absent: 0,
    wOff: 0
  });

  // Sample detailed data for each faculty
  const detailedData = {
    "Faculty A": [
      { id: 1, tradeFac: "Computer Science", name: "John Doe", status: "Present", remarks: "" },
      { id: 2, tradeFac: "Computer Science", name: "Jane Smith", status: "Leave", remarks: "Medical" },
      { id: 3, tradeFac: "Computer Science", name: "Bob Wilson", status: "Absent", remarks: "" },
      { id: 4, tradeFac: "Computer Science", name: "Alice Brown", status: "Present", remarks: "" },
    ],
    "Faculty B": [
      { id: 1, tradeFac: "Electronics", name: "Mike Johnson", status: "Present", remarks: "" },
      { id: 2, tradeFac: "Electronics", name: "Sarah Davis", status: "W/Off", remarks: "Weekend" },
      { id: 3, tradeFac: "Electronics", name: "Tom Harris", status: "Present", remarks: "" },
    ],
  };

  // Calculate summary and totals for each faculty
  useEffect(() => {
    const calculateSummary = () => {
      let totalStrength = 0;
      let totalPresent = 0;
      let totalLeave = 0;
      let totalAbsent = 0;
      let totalWOff = 0;

      const summary = Object.entries(detailedData).map(([facName, members], index) => {
        const strength = members.length;
        const present = members.filter(m => m.status === "Present").length;
        const leave = members.filter(m => m.status === "Leave").length;
        const absent = members.filter(m => m.status === "Absent").length;
        const wOff = members.filter(m => m.status === "W/Off").length;

        // Add to totals
        totalStrength += strength;
        totalPresent += present;
        totalLeave += leave;
        totalAbsent += absent;
        totalWOff += wOff;

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

      setTotals({
        totalStrength,
        present: totalPresent,
        leave: totalLeave,
        absent: totalAbsent,
        wOff: totalWOff
      });

      setMainTableData(summary);
    };

    calculateSummary();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleFacClick = (fac) => {
    setSelectedFac(fac);
    setShowDetailView(true);
  };

  const handleBack = () => {
    setShowDetailView(false);
    setSelectedFac(null);
  };

  return (
    <div className="attendance-container">
      <div className="header-actions">
        <button onClick={handlePrint} className="print-button">
          <FaPrint /> Print
        </button>
        {showDetailView && (
          <button onClick={handleBack} className="back-button">
            <FaArrowLeft /> Back
          </button>
        )}
      </div>

      {!showDetailView ? (
        <div className="main-table-container">
          <h2>Attendance Overview</h2>
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
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <span 
                      className="fac-link"
                      onClick={() => handleFacClick(row.facSecWing)}
                    >
                      {row.facSecWing}
                    </span>
                  </td>
                  <td>{row.totalStrength}</td>
                  <td>{row.present}</td>
                  <td>{row.leave}</td>
                  <td>{row.absent}</td>
                  <td>{row.wOff}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td></td>
                <td>Total</td>
                <td>{totals.totalStrength}</td>
                <td>{totals.present}</td>
                <td>{totals.leave}</td>
                <td>{totals.absent}</td>
                <td>{totals.wOff}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="detailed-table-container">
          <h2>{selectedFac} - Detailed View</h2>
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
              {detailedData[selectedFac]?.map((row) => (
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
        </div>
      )}
    </div>
  );
}

export default Attendance;