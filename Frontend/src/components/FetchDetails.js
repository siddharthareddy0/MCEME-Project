// FetchDetails.js
import React, { useState } from 'react';
import Attendance from './attendance';
import Registration from './Registration';
import './Fetch.css';

function FetchDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tradeFilter, setTradeFilter] = useState('');
  const [facWingFilter, setFacWingFilter] = useState('');
  const [casteFilter, setCasteFilter] = useState('');
  const [payLevelFilter, setPayLevelFilter] = useState('');
  const [serviceCriteriaFilter, setServiceCriteriaFilter] = useState('');
  const [activePage, setActivePage] = useState('fetchDetails');

  // Function to calculate years between two dates
  const calculateYears = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const yearsDiff = (end - start) / (365.25 * 24 * 60 * 60 * 1000);
    return yearsDiff;
  };

  // Function to check if person meets service criteria
  const meetsServiceCriteria = (row, criteria) => {
    const currentDate = new Date('2025-01-27'); // Using the current date from metadata

    switch(criteria) {
      case '4_years_audit':
        return calculateYears(row.doa, currentDate) >= 4;
      
      case '18_years_qualifying':
        return calculateYears(row.doa, currentDate) >= 18;
      
      case '5_years_before_retirement':
        const age = calculateYears(row.dob, currentDate);
        return age >= 55;
      
      case '30_years_service':
        return calculateYears(row.doa, currentDate) >= 30;
      
      default:
        return true;
    }
  };

  // Function to format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const data = [
    {
      slNo: 1,
      armyNumber: 'A12345',
      facWing: 'Wing A',
      trade: 'Electrical',
      name: 'John Doe',
      gpfPranNo: '123456',
      caste: 'General',
      dob: '1990-01-01',
      doa: '2024-06-15',
      dor: '2040-06-15',
      dop: '2020-06-15',
      payLevel: '7'
    },
    {
      slNo: 2,
      armyNumber: 'A12346',
      facWing: 'Wing B',
      trade: 'Mechanical',
      name: 'Siddu',
      gpfPranNo: '123',
      caste: 'OBC',
      dob: '1970-01-01',
      doa: '2005-06-15',
      dor: '2040-06-15',
      dop: '2020-06-15',
      payLevel: '6'
    },
    // Add more data here
  ];

  const filteredData = data.filter(
    (row) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesTrade = !tradeFilter || row.trade === tradeFilter;
      const matchesFacWing = !facWingFilter || row.facWing === facWingFilter;
      const matchesCaste = !casteFilter || row.caste === casteFilter;
      const matchesPayLevel = !payLevelFilter || row.payLevel === payLevelFilter;
      const matchesServiceCriteria = !serviceCriteriaFilter || meetsServiceCriteria(row, serviceCriteriaFilter);
      
      // Check if either army number or GPF/PRAN number matches
      const matchesArmyNumber = row.armyNumber && row.armyNumber.toLowerCase().includes(searchTermLower);
      const matchesGpfPran = row.gpfPranNo && row.gpfPranNo.toLowerCase().includes(searchTermLower);
      
      return (matchesArmyNumber || matchesGpfPran) && 
             matchesFacWing && 
             matchesTrade && 
             matchesCaste && 
             matchesPayLevel &&
             matchesServiceCriteria;
    }
  );

  return (
    <div className="fetch-details">
      <div className="header">
        <img src="/logo.png" alt=" Logo" className="logo" />
        <h1>MCEME</h1>
      </div>

      <div className="dashboard-menu">
        <button onClick={() => setActivePage('fetchDetails')}>Fetch Details</button>
        <button onClick={() => setActivePage('attendance')}>Attendance</button>
        <button onClick={() => setActivePage('leave')}>Leave</button>
        <button onClick={() => setActivePage('registration')}>Registration</button>
      </div>
      {activePage === 'fetchDetails' && (
      <div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by Army Number or GPF/PRAN NO"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={facWingFilter}
          onChange={(e) => setFacWingFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Fac/Wings</option>
          <option value="Wing A">Wing A</option>
          <option value="Wing B">Wing B</option>
          <option value="Wing C">Wing C</option>
          <option value="Wing D">Wing D</option>
        </select>
        <select
          value={tradeFilter}
          onChange={(e) => setTradeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Trades</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Electronics">Electronics</option>
          <option value="IT">IT</option>
        </select>
        <select
          value={casteFilter}
          onChange={(e) => setCasteFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Castes</option>
          <option value="General">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>
        <select
          value={payLevelFilter}
          onChange={(e) => setPayLevelFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Pay Levels</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
          <option value="10">Level 10</option>
        </select>
        <select
          value={serviceCriteriaFilter}
          onChange={(e) => setServiceCriteriaFilter(e.target.value)}
          className="filter-select service-criteria-select"
        >
          <option value="">All Service Criteria</option>
          <option value="4_years_audit">4 Years Audit</option>
          <option value="18_years_qualifying">18 Years Qualifying Service</option>
          <option value="5_years_before_retirement">5 Years Before Retirement</option>
          <option value="30_years_service">30 Years of Service</option>
        </select>
      </div>
     
      {filteredData.length === 0 ? (
        <div className="no-results">
          <p>No details found for the given search criteria.</p>
        </div>
      ) : (
      <table className="details-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Army Number</th>
            <th>Fac/Wing</th>
            <th>Trade</th>
            <th>Name</th>
            <th>GPF/PRAN No</th>
            <th>Caste</th>
            <th>DoB</th>
            <th>DoA</th>
            <th>DoR</th>
            <th>DoP</th>
            <th>Pay Level</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.slNo}</td>
              <td>{row.armyNumber}</td>
              <td>{row.facWing}</td>
              <td>{row.trade}</td>
              <td>{row.name}</td>
              <td>{row.gpfPranNo}</td>
              <td>{row.caste}</td>
              <td>{formatDate(row.dob)}</td>
              <td>{formatDate(row.doa)}</td>
              <td>{formatDate(row.dor)}</td>
              <td>{formatDate(row.dop)}</td>
              <td>{row.payLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
      )}


{activePage === 'attendance' && (
        <div>
          <Attendance />
        </div>
      )}


{activePage === 'leave' && (
        <div>
          <h2>Leave Management</h2>
          <p>This is the Leave Management page. Add your leave details here.</p>
        </div>
      )}


{activePage === 'registration' && (
        <div>
          <Registration />
        </div>
      )}
      </div>
  );
}

export default FetchDetails;
