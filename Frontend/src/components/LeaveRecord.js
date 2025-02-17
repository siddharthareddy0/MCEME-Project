import React, { useState } from 'react';
import './LeaveManagement.css';

const LeaveRecord = () => {
  const [searchPersNo, setSearchPersNo] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('Leave Type');
  const leaveTypes = ['Leave Type', 'EL', 'ML', 'CL', 'RH', 'CCL', 'PL', 'Extension of Leave'];

  // Dummy records with more varied leave types
  const dummyRecords = [
    {
      persNo: "12345",
      name: "John Smith",
      trade: "Technical",
      records: [
        { daysEntitled: 30, fromDate: "2024-01-01", toDate: "2024-01-10", typeOfLeave: "CL", noOfDays: 10, balance: 20 },
        { daysEntitled: 30, fromDate: "2024-02-15", toDate: "2024-02-20", typeOfLeave: "EL", noOfDays: 6, balance: 24 },
        { daysEntitled: 15, fromDate: "2024-03-01", toDate: "2024-03-05", typeOfLeave: "ML", noOfDays: 5, balance: 10 }
      ]
    },
    {
      persNo: "67890",
      name: "David Wilson",
      trade: "Mechanical",
      records: [
        { daysEntitled: 30, fromDate: "2024-01-05", toDate: "2024-01-15", typeOfLeave: "CL", noOfDays: 11, balance: 19 },
        { daysEntitled: 30, fromDate: "2024-03-10", toDate: "2024-03-15", typeOfLeave: "ML", noOfDays: 6, balance: 24 },
        { daysEntitled: 20, fromDate: "2024-04-01", toDate: "2024-04-05", typeOfLeave: "RH", noOfDays: 5, balance: 15 }
      ]
    },
    {
      persNo: "11223",
      name: "Robert Johnson",
      trade: "Electrical",
      records: [
        { daysEntitled: 30, fromDate: "2024-02-01", toDate: "2024-02-05", typeOfLeave: "CL", noOfDays: 5, balance: 25 },
        { daysEntitled: 30, fromDate: "2024-04-10", toDate: "2024-04-20", typeOfLeave: "PL", noOfDays: 11, balance: 19 },
        { daysEntitled: 15, fromDate: "2024-05-01", toDate: "2024-05-10", typeOfLeave: "CCL", noOfDays: 10, balance: 5 }
      ]
    }
  ];

  const selectedPerson = searchPersNo ? 
    dummyRecords.find(record => record.persNo.includes(searchPersNo)) : null;

  const filteredRecords = selectedPerson?.records.filter(record => 
    selectedLeaveType === 'Leave Type' || record.typeOfLeave === selectedLeaveType
  ) || [];

  const handlePrint = () => {
    window.print();
  };

  const getTitle = () => {
    if (selectedLeaveType === 'Leave Type') {
      return 'LEAVE RECORD ';
    }
    return `${selectedLeaveType} LEAVE RECORD `;
  };

  return (
    <div className="leave-record-main-container">
      <div className="leave-record-header">
        <h2 className="college-name print-only">MILITARY COLLEGE OF EME, SECUNDERABAD</h2>
        <h3 className="leave-record-title">{getTitle()}</h3>
      </div>

      <div className="controls-container no-print">
        <input
          type="text"
          placeholder="Search by Pers No"
          value={searchPersNo}
          onChange={(e) => setSearchPersNo(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedLeaveType}
          onChange={(e) => setSelectedLeaveType(e.target.value)}
          className="leave-type-select"
        >
          {leaveTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button onClick={handlePrint} className="print-button">Print Record</button>
      </div>

      {selectedPerson && (
        <div className="person-info">
          <div className="info-row">
            <span>PERS NO: {selectedPerson.persNo}</span>
            <span>TRADE: {selectedPerson.trade}</span>
            <span>NAME: {selectedPerson.name}</span>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="leave-table">
          <thead>
            <tr>
              <th>DAYS ENTITLED</th>
              <th>FROM</th>
              <th>TO</th>
              <th>TYPE OF LEAVE</th>
              <th>NO OF DAYS</th>
              <th>BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.daysEntitled}</td>
                <td>{record.fromDate}</td>
                <td>{record.toDate}</td>
                <td>{record.typeOfLeave}</td>
                <td>{record.noOfDays}</td>
                <td>{record.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRecord;