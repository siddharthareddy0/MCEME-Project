// FetchDetails.js
import React, { useState } from 'react';
import Attendance from './attendance';
import Registration from './Registration';
import Leave from './LeaveManagement';
import Header from './Header';
import ViewRegistration from './ViewRegistration';
import { FaPrint} from "react-icons/fa";
import './Fetch.css';

function FetchDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tradeFilter, setTradeFilter] = useState('');
  const [facWingFilter, setFacWingFilter] = useState('');
  const [casteFilter, setCasteFilter] = useState('');
  const [payLevelFilter, setPayLevelFilter] = useState('');
  const [serviceCriteriaFilter, setServiceCriteriaFilter] = useState('');
  const [industrialFilter, setIndustrialFilter] = useState('');
  const [activePage, setActivePage] = useState('fetchDetails');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
      facWing: 'FEL',
      trade: 'LDC',
      name: 'John Doe',
      gpfPranNo: '123456',
      caste: 'General',
      dob: '1990-01-01',
      doa: '2024-06-15',
      dor: '2040-06-15',
      dop: '2020-06-15',
      payLevel: '7',
      industrial: 'Industrial'
    },
    {
      slNo: 2,
      armyNumber: 'A12346',
      facWing: 'FDE',
      trade: 'UDC',
      name: 'Siddu',
      gpfPranNo: '123',
      caste: 'OBC',
      dob: '1970-01-01',
      doa: '2005-06-15',
      dor: '2040-06-15',
      dop: '2020-06-15',
      payLevel: '6',
      industrial: 'Non-Industrial'
    },
    // Add more data here
  ];

  const filteredData = data.filter((row) => {
    // Only apply search term filter if there is a search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesArmyNumber = row.armyNumber && row.armyNumber.toLowerCase().includes(searchTermLower);
      const matchesGpfPran = row.gpfPranNo && row.gpfPranNo.toLowerCase().includes(searchTermLower);
      if (!matchesArmyNumber && !matchesGpfPran) {
        return false;
      }
    }

    // Apply other filters only if they are set
    if (tradeFilter && row.trade !== tradeFilter) return false;
    if (facWingFilter && row.facWing !== facWingFilter) return false;
    if (casteFilter && row.caste !== casteFilter) return false;
    if (payLevelFilter && row.payLevel !== payLevelFilter) return false;
    if (industrialFilter && row.industrial !== industrialFilter) return false;
    if (serviceCriteriaFilter && !meetsServiceCriteria(row, serviceCriteriaFilter)) return false;

    return true;
  });

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  // Add console log to debug
  console.log('Filtered Data:', filteredData);

  if (selectedEmployee) {
    return <ViewRegistration data={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;
  }

  const resetFilters = () => {
    setSearchTerm('');
    setTradeFilter('');
    setFacWingFilter('');
    setCasteFilter('');
    setPayLevelFilter('');
    setServiceCriteriaFilter('');
    setIndustrialFilter('');
  };

  return (
    <div className="fetch-details-container">
      {/* <div className="header no-print">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>MCEME</h1>
      </div> */}
      <Header />

      <div className="dashboard-menu no-print">
        <button onClick={() => setActivePage('registration')}>Registration</button>
        <button onClick={() => setActivePage('fetchDetails')}>Fetch Details</button>
        <button onClick={() => setActivePage('attendance')}>Attendance</button>
        <button onClick={() => setActivePage('leave')}>Leave</button>
        
      </div>

      {activePage === 'fetchDetails' && (
        <>
          <div className="search-filter no-print">
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
              <option value="Budget Cell">HQ Adm Wg-Budget Cell</option>
              <option value="FAE">FAE</option>
              <option value="HQ Coy">HQ Adm Wg</option>
              <option value="HQ Trg Wing">HQ Trg Wing</option>
              <option value="HQ Coy">HQ Adm Wg-HQ Coy</option>
              <option value="MTS">HQ Trg Wg-MTS</option>
              <option value="SDD">SDD</option>
              <option value="FEMT">FEMT</option>
              <option value="Col Adm Sectt">HQ Adm Wg-Col Adm Sectt</option>
              <option value="FEME">FEME</option>
              <option value="JCO Mess">FEME-JCO Mess</option>
              <option value="Offr Mess">FEME-Offr Mess</option>
              <option value="CTW">CTW</option>
              <option value="Mag 5">Mag 5</option>
              <option value="EMESA">HQ Adm Wg-EMESA</option>
              <option value="FDE">FDE</option>
              <option value="Comdt Sectt">HQ Trg Wg-Comdt Sectt</option>
              <option value="SM Br">HQ Adm Wg-SM Br</option>
              <option value="FEL">FEL</option>
              <option value="A Coy">FEME-A Coy</option>
              <option value="Fin Sec">HQ Adm Wg-Fin Sec</option>
              <option value="Est Civ Sec">HQ Adm Wg-Est Civ Sec</option>
              <option value="Adjt Sec">HQ Adm Wg-Adjt Sec</option>
              <option value="E Coy">FAE- 'E' Coy</option>
              <option value="MTO">HQ Adm Wg-MTO</option>
              <option value="QM Sec">HQ Adm Wg-QM Sec</option>
              <option value="QM Fire Stn">HQ Adm Wg-QM Fire Stn</option>
              <option value="MCEME Liby">HQ Trg Wg-MCEME Liby</option>
              <option value="AA&QMG">HQ Adm Wg-AA&QMG</option>
              <option value="Est (O) Civ Sec">HQ Adm Wg-Est(O)Civ Sec</option>
              <option value="BSO">HQ Trg Wg-BSO</option>
              <option value="Ccoy"> FEL-'C' Coy</option>
              <option value="Bcoy">FEL-'B' Coy</option>
            </select>
            <select
              value={tradeFilter}
              onChange={(e) => setTradeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Trades</option>
              <option value="Barber">Barber</option>
              <option value="Book Binder">Book Binder</option>
              <option value="C&J">C&J</option>
              <option value="Cine Proj Mate">Cine Proj Mate</option>
              <option value="CMD Gde I">CMD Gde I</option>
              <option value="CMD Gde II">CMD Gde II</option>
              <option value="CMD OG">CMD OG</option>
              <option value="CMD Spl GDE">CMD Spl GDE</option>
              <option value="Cook">Cook</option>
              <option value="FBP">FBP</option>
              <option value="Fireman">Fireman</option>
              <option value="Fitter">Fitter</option>
              <option value="Foreman">Foreman</option>
              <option value="Inst Mech">Inst Mech</option>
              <option value="Lab Asst">Lab Asst</option>
              <option value="Lab Attd">Lab Attd</option>
              <option value="Lab Demo">Lab Demo</option>
              <option value="LDC">LDC</option>
              <option value="LH (NT)">LH (NT)</option>
              <option value="Machinist">Machinist</option>
              <option value="Moulder">Moulder</option>
              <option value="MTS (Chow)">MTS (Chow)</option>
              <option value="MTS (Daftry)">MTS (Daftry)</option>
              <option value="MTS (Mali)">MTS (Mali)</option>
              <option value="MTS (Msgr)">MTS (Msgr)</option>
              <option value="MTS (Sfwi)">MTS (Sfwi)</option>
              <option value="O/Supdt">O/Supdt</option>
              <option value="Painter & Dec">Painter & Dec</option>
              <option value="Pattern Maker">Pattern Maker</option>
              <option value="Photographer">Photographer</option>
              <option value="Poster Artist">Poster Artist</option>
              <option value="Snr Dtmn">Snr Dtmn</option>
              <option value="Spvr (NT)">Spvr (NT)</option>
              <option value="Steno Gde I">Steno Gde I</option>
              <option value="Steno Gde II">Steno Gde II</option>
              <option value="Store Keeper">Store Keeper</option>
              <option value="Tailor">Tailor</option>
              <option value="TCM">TCM</option>
              <option value="TCS">TCS</option>
              <option value="Tdsman Mate">Tdsman Mate</option>
              <option value="UDC">UDC</option>
              <option value="Washerman">Washerman</option>
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
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
              <option value="7">Level 7</option>
              <option value="8">Level 8</option>
              <option value="9">Level 9</option>
              <option value="10">Level 10</option>
            </select>
            <select
              value={serviceCriteriaFilter}
              onChange={(e) => setServiceCriteriaFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Service Criteria</option>
              <option value="4_years_audit">4+ Years Service (Audit)</option>
              <option value="18_years_qualifying">18+ Years Qualifying Service</option>
              <option value="5_years_before_retirement">5 Years Before Retirement</option>
              <option value="30_years_service">30+ Years Service</option>
            </select>
            <select
              value={industrialFilter}
              onChange={(e) => setIndustrialFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="Industrial">Industrial</option>
              <option value="Non-Industrial">Non-Industrial</option>
            </select>

            <button className="reset" onClick={resetFilters} style={{ marginLeft: 'auto' }}>
              Reset
            </button>
          </div>
          <div className="table-section">
            <div className="table-head">
              <h2>Fetch Details</h2>
              <button onClick={handlePrint} className="print-button1 no-print">
                 <FaPrint/>Print
              </button>
            </div>
            <div className="table-wrapper">
              {filteredData.length > 0 ? (
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
                      <th>Industrial/Non-Industrial</th>
                      <th>Pay Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row) => (
                      <tr key={row.slNo}>
                        <td>{row.slNo}</td>
                        <td>{row.armyNumber}</td>
                        <td>{row.facWing}</td>
                        <td>{row.trade}</td>
                        <td
                          style={{ cursor: 'pointer', color: '#0066cc' }}
                          onClick={() => setSelectedEmployee(row)}
                        >
                          {row.name}
                        </td>
                        <td>{row.gpfPranNo}</td>
                        <td>{row.caste}</td>
                        <td>{formatDate(row.dob)}</td>
                        <td>{formatDate(row.doa)}</td>
                        <td>{formatDate(row.dor)}</td>
                        <td>{formatDate(row.dop)}</td>
                        <td>{row.industrial}</td>
                        <td>{row.payLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-results">
                  <p>No details found for the given search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {activePage === 'attendance' && <Attendance />}
      {activePage === 'leave' && <Leave/>}
      {activePage === 'registration' && <Registration />}
    </div>
  );
}

export default FetchDetails;