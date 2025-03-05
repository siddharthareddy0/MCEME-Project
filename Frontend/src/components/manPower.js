import React from 'react';
import NavBar from './NavBar';
import './manPower.css';

const ManPower = () => {
  const handlePrint = () => {
    // Create a hidden iframe for printing
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    // Get all tables
    const tables = document.querySelectorAll('.table-wrapper');
    
    // Create print document content
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Manpower Tables</title>
          <style>
            @page {
              size: A4;
              margin: 1.5cm;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
            .print-container {
              width: 100%;
            }
            .table-wrapper {
              width: 100%;
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .table-wrapper:nth-child(2n)::after {
              content: '';
              display: block;
              page-break-after: always;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid black;
              padding: 4px;
              font-size: 10pt;
              text-align: left;
            }
            h3 {
              margin: 0 0 10px 0;
              font-size: 12pt;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${Array.from(tables).map(table => table.outerHTML).join('')}
          </div>
        </body>
      </html>
    `;

    // Write to iframe and print
    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(printContent);
    frameDoc.close();

    // Wait for images and styles to load
    printFrame.onload = () => {
      try {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
      } catch (e) {
        console.error('Print failed:', e);
      }
    };

    // Remove iframe after printing
    const cleanup = () => {
      if (printFrame && printFrame.parentNode === document.body) {
        document.body.removeChild(printFrame);
      }
    };
    printFrame.contentWindow.onafterprint = cleanup;
    // Backup cleanup in case onafterprint doesn't fire
    setTimeout(() => {
      cleanup();
    }, 2000);
  };

  return (
    <div className="manpower-container">
      <NavBar />
      <button className="print-button5" onClick={handlePrint}>Print Tables</button>
      
      <div className="tables-container">
        {/* Table 1: MANPOWER STATE - CIV */}
        <div className="table-wrapper">
          <h3>MANPOWER STATE : CIV</h3>
          <table>
            <thead>
              <tr>
                <th>Cat</th>
                <th>Auth as per PE</th>
                <th>Auth as per UPP</th>
                <th>Held</th>
                <th>Defi/Sur</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Non-Ind (Centrally Controlled)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Non-Ind (Unit Controlled)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Ind (Unit Controlled)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Fire Staff</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 2: MANPOWER SUMMARY STATE : CIV DEF EMP */}
        <div className="table-wrapper">
          <h3>MANPOWER SUMMARY STATE : CIV DEF EMP</h3>
          <table>
            <thead>
              <tr>
                <th rowSpan="2">Cat</th>
                <th colSpan="2">Auth Wg</th>
                <th colSpan="2">Trg Wg</th>
                <th colSpan="2">FEMT</th>
                <th colSpan="2">FEL</th>
                <th colSpan="2">FEME</th>
                <th colSpan="2">FAE</th>
                <th colSpan="2">CTW</th>
                <th colSpan="2">SDD</th>
                <th colSpan="2">FDE</th>
                <th colSpan="2">TOTAL</th>
              </tr>
              <tr>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Non-Ind (Centrally Controlled)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Non-Ind (Unit Controlled)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Ind (Unit Controlled)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Fire Staff</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 3: MANPOWER DISTR : NON IND CENTRALLY CONTROLLED */}
        <div className="table-wrapper">
          <h3>MANPOWER DISTR : NON IND CENTRALLY CONTROLLED</h3>
          <table>
            <thead>
              <tr>
                <th rowSpan="2">Trade</th>
                <th colSpan="2">Adm Wg</th>
                <th colSpan="2">Trg Wg</th>
                <th colSpan="2">FEMT</th>
                <th colSpan="2">FEL</th>
                <th colSpan="2">FEME</th>
                <th colSpan="2">FAE</th>
                <th colSpan="2">CTW</th>
                <th colSpan="2">SDD</th>
                <th colSpan="2">FDE</th>
                <th colSpan="2">TOTAL</th>
              </tr>
              <tr>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>O/Supdt</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Cashier</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Clerks</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>CMD</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Liby Gde II & III</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Lab Demo</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Lab Asst</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Drmn Gde I & II (Snr Drmn)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Steno Gde II (now Gde I)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Steno Gde III (now Gde II)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Photographer</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Poster Artist</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Cinema Operator Gde I</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Ferro Printer</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Supvr Electric (Foreman)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Store Keeper</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Supvr LH(NT)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Leading Hand(NT)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 4: MANPOWER DISTR: NON IND UNIT CONTROLLED */}
        <div className="table-wrapper">
          <h3>MANPOWER DISTR: NON IND UNIT CONTROLLED </h3>
          <table>
            <thead>
            <tr>
                <th rowSpan="2">Trade</th>
                <th colSpan="2">Adm Wg</th>
                <th colSpan="2">Trg Wg</th>
                <th colSpan="2">FEMT</th>
                <th colSpan="2">FEL</th>
                <th colSpan="2">FEME</th>
                <th colSpan="2">FAE</th>
                <th colSpan="2">CTW</th>
                <th colSpan="2">SDD</th>
                <th colSpan="2">FDE</th>
                <th colSpan="2">TOTAL</th>
              </tr>
              <tr>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Cinema Proj Mate</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Laboratory Attendant</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Daftry</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Messenger</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Mali</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Chowkidar</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Safaiwala</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Barbers</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Washerman</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Tailor</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Boot Maker</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Cook</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
          <td>
                <td>@ -01 x Offrs Mess | # -01 x 'A' Coy, 02 x Offrs Mess | $ -02 x Offrs Mess | % -02 x 'A' Coy |  
                & -03 x 'A' Coy | * -03 x Offrs Mess, 01 x JCOs Mess, 03 x 'A' Coy | ^ -01 x 'B' Coy, 01 x 'C' Coy | 
                ~ -02 x 'B' Coy, 02 x 'C' Coy | 
                ** -01 x 'B' Coy, 02 x 'C' Coy | ^^ -02 x 'E' Coy | ~~ -02 x 'E' Coy  
                </td>
            </td>

        </div>

        {/* Table 5: MANPOWER DISTR -IND UNIT CONTROLLED*/}
        <div className="table-wrapper">
          <h3>MANPOWER DISTR : IND UNIT CONTROLLED</h3>
          <table>
            <thead>
            <tr>
                <th rowSpan="2">Trade</th>
                <th colSpan="2">Adm Wg</th>
                <th colSpan="2">Trg Wg</th>
                <th colSpan="2">FEMT</th>
                <th colSpan="2">FEL</th>
                <th colSpan="2">FEME</th>
                <th colSpan="2">FAE</th>
                <th colSpan="2">CTW</th>
                <th colSpan="2">SDD</th>
                <th colSpan="2">FDE</th>
                <th colSpan="2">TOTAL</th>
              </tr>
              <tr>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Book Binder</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Carpenter & Joiner</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Fitter</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Inst Mech</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Machinist</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Painter & Decorater</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Moulder</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>TCS</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Artist</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>TCM(ILC)</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Tradesman Mate</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
          <td>
            <td>*02 x Offrs Mess</td>
          </td>
        </div>

        {/* Table 6: MANPOWER DISTR: FIRE STAFF */}
        <div className="table-wrapper">
          <h3>MANPOWER DISTR : FIRE STAFF</h3>
          <table>
            <thead>
            <tr>
                <th rowSpan="2">Trade</th>
                <th colSpan="2">Adm Wg</th>
                <th colSpan="2">Trg Wg</th>
                <th colSpan="2">FEMT</th>
                <th colSpan="2">FEL</th>
                <th colSpan="2">FEME</th>
                <th colSpan="2">FAE</th>
                <th colSpan="2">CTW</th>
                <th colSpan="2">SDD</th>
                <th colSpan="2">FDE</th>
                <th colSpan="2">TOTAL</th>
              </tr>
              <tr>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
                <th>A</th><th>H</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Supvr Fire</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>LH Fire</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Fire Engine Driver</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Fireman</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Fitter</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
          <td>
            <td>*02 x Offrs Mess</td>
          </td>
        </div>
      </div>
    </div>
  );
};

export default ManPower;