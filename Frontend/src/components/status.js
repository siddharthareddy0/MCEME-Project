import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./status.css";
import KinderedRollService from "../services/kinderedRollService.js";

function Status() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await KinderedRollService.getAllRecords();
        setData(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handlePrint = async (potNo, status) => {
    if (status.toLowerCase() === 'rejected') return;
    
    try {
      const recordDetails = await KinderedRollService.getRecordById(potNo);
      const printContent = status.toLowerCase() === 'accepted' ? `
        <div style="padding: 40px;">
          <h1 style="text-align: center;">Kindered Roll Details</h1>
          <hr style="margin: 20px 0"/>
          
          <div style="margin-bottom: 30px;">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> ${recordDetails.name || 'N/A'}</p>
            <p><strong>Rank:</strong> ${recordDetails.rank || 'N/A'}</p>
            <p><strong>Army Number:</strong> ${recordDetails.army_number || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> ${recordDetails.dob || 'N/A'}</p>
            <p><strong>Unit:</strong> ${recordDetails.unit || 'N/A'}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3>Contact Information</h3>
            <p><strong>Contact Number:</strong> ${recordDetails.contact || 'N/A'}</p>
            <p><strong>Email:</strong> ${recordDetails.email || 'N/A'}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3>Application Details</h3>
            <p><strong>POT Number:</strong> ${recordDetails.pot_no}</p>
            <p><strong>Type:</strong> ${recordDetails.type}</p>
            <p><strong>Status:</strong> ${recordDetails.status}</p>
            <p><strong>Status Date:</strong> ${recordDetails.status_date ? new Date(recordDetails.status_date).toLocaleDateString('en-GB') : 'N/A'}</p>
          </div>
        </div>
      ` : `
        Kindered Roll Details
        --------------------
        POT Number: ${recordDetails.pot_no}
        Type: ${recordDetails.type}
        Status: ${recordDetails.status}
        Name: ${recordDetails.name || 'N/A'}
        Rank: ${recordDetails.rank || 'N/A'}
        Unit: ${recordDetails.unit || 'N/A'}
        Date of Birth: ${recordDetails.dob || 'N/A'}
        Contact Number: ${recordDetails.contact || 'N/A'}
        Email: ${recordDetails.email || 'N/A'}
      `;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Kindered Roll Details</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                line-height: 1.6;
                margin: 0;
                padding: 0;
              }
              pre { white-space: pre-wrap; }
              h1, h3 { color: #333; }
              p { margin: 8px 0; }
              @media print {
                @page { margin: 0.5cm; }
              }
            </style>
          </head>
          <body>
            ${status.toLowerCase() === 'accepted' ? printContent : `<pre>${printContent}</pre>`}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } catch (error) {
      console.error('Error printing details:', error);
      alert('Failed to load printing details');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="status-container">
        <div className="table-container">
          <h2>Status Details</h2>
          <table className="status-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>PTO No</th>
                <th>Army Number</th>
                <th>Type</th>
                <th>Status</th>
                <th>Status date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((request, index) => (
                <tr 
                  key={index}
                  className="table-row"
                >
                  <td>{index + 1}</td>
                  <td>{request.pot_no}</td>
                  <td>{request.army_number}</td>
                  <td>{request.type}</td>
                  <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
                  <td>{request.status_date ? new Date(request.status_date).toLocaleDateString('en-GB').split('T')[0] : 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => handlePrint(request.pot_no, request.status)}
                      disabled={request.status.toLowerCase() === 'rejected'}
                      style={{
                        opacity: request.status.toLowerCase() === 'rejected' ? 0.5 : 1,
                        cursor: request.status.toLowerCase() === 'rejected' ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Status;