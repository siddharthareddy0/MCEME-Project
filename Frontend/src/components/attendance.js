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
    let allFaculties = [];
    let index = 1;

    Object.entries(attendanceData).forEach(([facName, data]) => {
      if (data.isParent) {
        // Add each subfaculty as a separate row
        Object.entries(data.subFaculties).forEach(([subFacName, members]) => {
          const strength = members.length;
          const present = members.filter(m => m.status === "Present").length;
          const leave = members.filter(m => m.status === "Leave").length;
          const absent = members.filter(m => m.status === "Absent").length;
          const wOff = members.filter(m => m.status === "W/Off").length;

          allFaculties.push({
            id: index++,
            facSecWing: subFacName,
            totalStrength: strength,
            present,
            leave,
            absent,
            wOff,
            parentFac: facName,
            members: members
          });
        });
      } else {
        // Add regular faculty as a row
        const strength = data.length;
        const present = data.filter(m => m.status === "Present").length;
        const leave = data.filter(m => m.status === "Leave").length;
        const absent = data.filter(m => m.status === "Absent").length;
        const wOff = data.filter(m => m.status === "W/Off").length;

        allFaculties.push({
          id: index++,
          facSecWing: facName,
          totalStrength: strength,
          present,
          leave,
          absent,
          wOff,
          members: data
        });
      }
    });

    return allFaculties;
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

  const handleFacClick = (facData) => {
    setSelectedFac(facData);
    setShowDetailView(true);
  };

  const handleBack = () => {
    setShowDetailView(false);
    setSelectedFac(null);
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
          margin: 1cm; 
        }
        body { 
          margin: 0; 
          padding: 0;
          font-family: Arial, sans-serif;
        }
        table { 
          width: 100%; 
          border-collapse: collapse;
          margin-bottom: 15px;
          page-break-inside: avoid;
          border: 2px solid black;
        }
        th, td { 
          border: 1px solid black;
          padding: 6px; 
          text-align: center; 
          font-size: 11px;
        }
        th {
          font-weight: bold;
          background-color: #f5f5f5;
          border-bottom: 2px solid black;
        }
        tr:last-child td {
          border-bottom: 2px solid black;
        }
        td:first-child, th:first-child {
          border-left: 2px solid black;
        }
        td:last-child, th:last-child {
          border-right: 2px solid black;
        }
        .total-row td {
          font-weight: bold;
          background-color: #f5f5f5;
          border-top: 2px solid black;
        }
        h2 { 
          text-align: center; 
          margin: 10px 0;
          font-size: 14px;
          text-transform: uppercase;
        }
        .section {
          margin-bottom: 15px;
          page-break-inside: avoid;
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
    if (showDetailView) {
        // Print faculty-wise details
        const content = `
            <div class="section">
                <h2><u>${selectedFac.facSecWing} STAFF PARADE STATE AS ON ${formatMilitaryDate(new Date())}</u></h2>

                
                <table>
                    <thead>
                        <tr>
                            <th>GPF/PRAN No</th>
                            <th>Trade/Fac</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${selectedFac.members.map(row => `
                            <tr>
                                <td>${row.id}</td>
                                <td>${row.tradeFac}</td>
                                <td>${row.name}</td>
                                <td>${row.status}</td>
                                <td>${row.remarks || ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        createPrintIframe(content);
    } else {
        // Print main table
        const content = `
            <div class="section">
                <h2><u>MCEME STAFF PARADE STATE AS ON ${formatMilitaryDate(new Date())}</u></h2>
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
                        ${mainTableData.map(row => `
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
    }
  };

  return (
    <div className="attendance-container">
      {!showDetailView ? (
        <div className="main-table-container">
          <div className="table-head">
            <h2>PARADE STATE FOR {formatMilitaryDate(new Date())} OF CDEs MCEME</h2>
            <button onClick={handlePrint} className="print-button1 no-print">
              <FaPrint /> Print
            </button>
          </div>
          <div className="table-wrapper">
            {mainTableData.length > 0 ? (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
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
                    <tr key={row.id} onClick={() => handleFacClick(row)} style={{ cursor: 'pointer' }}>
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
            <h2>{selectedFac.facSecWing} STAFF PARADE STATE AS ON {formatMilitaryDate(new Date())}</h2>
            <div className="button-group">
              <button onClick={handleBack} className="back-button3">
                <FaArrowLeft /> Back
              </button>
              <button onClick={handlePrint} className="print-button3">
                <FaPrint /> Print
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            {selectedFac.members?.length > 0 ? (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>GPF/PRAN No</th>
                    <th>Trade/Fac</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFac.members.map((row) => (
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
                <p>No attendance details found for {selectedFac.facSecWing}.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;