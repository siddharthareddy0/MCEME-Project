import React from 'react';
import NavBar from './NavBar';
import './Retirement.css';

const Retirements = () => {
  const handlePrint = () => {
    window.print();
  };

  // Format current date as DD MMM YYYY
  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const currentDate = new Date('2025-03-08'); // Using the provided system date
  const formattedDate = formatDate(currentDate);

  return (
    <div className="retirement-container">
      <NavBar />
      <div className="print-content">
        <div className="print-header">
          <div className="org-details">
            MCEME<br />
            PIN 900453<br />
            C/O 56 APO
          </div>
          <div className="doc-title">
            RESTRICTED<br />
            DAILY ORDERS PART II
          </div>
          <div className="page-details">
            Page: 01 & Last<br />
            No: 01/CW/2025<br />
            Dated: {formattedDate}
          </div>
          <div className="last-do">
            LAST DO PART II NO: 193/CW/2024 DT 31 DEC 2024
          </div>
        </div>

        <div className="print-body">
          <h2>RETIREMENT CIVILIANS:</h2>
          {/* <p className="retirement-description">
            The under mentioned civilian personnel on attaining the age of superannuation i.e., 60 years will retire from service on the date shown against each:-
          </p> */}

          <div className="section">
            <h3>SECTION I: NON GAZ NON INDUSTRIAL PERS(CENTRALLY CONTROLLED)</h3>
            <table>
              <thead>
                <tr>
                  <th>Ser</th>
                  <th>No. Rank & Name</th>
                  <th>Date of Birth</th>
                  <th>Date of Appt</th>
                  <th>Date of Ret</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>(a)</td>
                  <td>P-3703 CMD Spl Gde Sagayanathan</td>
                  <td>03 Jul 1966</td>
                  <td>21 Nov 1988</td>
                  <td>31 Jul 2026</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section">
            <h3>SECTION II: NON GAZ NON INDUSTRIAL PERS(UNIT CONTROLLED)</h3>
            <table>
              <thead>
                <tr>
                  <th>Ser</th>
                  <th>No. Rank & Name</th>
                  <th>Date of Birth</th>
                  <th>Date of Appt</th>
                  <th>Date of Ret</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>(b)</td>
                  <td>T-1072 Lab Attd Laxmi Bai</td>
                  <td>01 Jun 1966</td>
                  <td>23 Jul 2001</td>
                  <td>31 May 2026</td>
                </tr>
                <tr>
                  <td>(c)</td>
                  <td>T-1177 MTS (Msgr) Shaik Khaja Mohiddin</td>
                  <td>17 Mar 1966</td>
                  <td>11 Sep 2012</td>
                  <td>31 Mar 2026</td>
                </tr>
                <tr>
                  <td>(d)</td>
                  <td>T-1022 MTS (Msgr) S Venu Kumar</td>
                  <td>22 Apr 1966</td>
                  <td>06 Jan 1998</td>
                  <td>30 Apr 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="print-footer">
          <div className="signature">
            (SK Singh)<br />
            Brig<br />
            Est Offr (Civ)
          </div>
          <div className="restricted-footer">
            RESTRICTED
          </div>
        </div>
      </div>

      <div className="screen-content">
        
        <h1 className="main-heading">RETIREMENT CIVILIANS</h1>
        {/* <p className="retirement-description">
            The under mentioned civilian personnel on attaining the age of superannuation i.e., 60 years will retire from service on the date shown against each:-
          </p> */}
        
        <section className="retirement-section">
          <h2 className="section-heading">SECTION I: NON GAZ NON INDUSTRIAL PERS(CENTRALLY CONTROLLED)</h2>
          <table className="retirement-table">
            <thead>
              <tr>
                <th>Ser</th>
                <th>No. Rank & Name</th>
                <th>Date of Birth</th>
                <th>Date of Appt</th>
                <th>Date of Ret</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>(a)</td>
                <td>P-3703 CMD Spl Gde Sagayanathan</td>
                <td>03 Jul 1966</td>
                <td>21 Nov 1988</td>
                <td>31 Jul 2026</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="retirement-section">
          <h2 className="section-heading">SECTION II: NON GAZ NON INDUSTRIAL PERS(UNIT CONTROLLED)</h2>
          <table className="retirement-table">
            <thead>
              <tr>
                <th>Ser</th>
                <th>No. Rank & Name</th>
                <th>Date of Birth</th>
                <th>Date of Appt</th>
                <th>Date of Ret</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>(b)</td>
                <td>T-1072 Lab Attd Laxmi Bai</td>
                <td>01 Jun 1966</td>
                <td>23 Jul 2001</td>
                <td>31 May 2026</td>
              </tr>
              <tr>
                <td>(c)</td>
                <td>T-1177 MTS (Msgr) Shaik Khaja Mohiddin</td>
                <td>17 Mar 1966</td>
                <td>11 Sep 2012</td>
                <td>31 Mar 2026</td>
              </tr>
              <tr>
                <td>(d)</td>
                <td>T-1022 MTS (Msgr) S Venu Kumar</td>
                <td>22 Apr 1966</td>
                <td>06 Jan 1998</td>
                <td>30 Apr 2026</td>
              </tr>
            </tbody>
          </table>
        </section>

        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default Retirements;