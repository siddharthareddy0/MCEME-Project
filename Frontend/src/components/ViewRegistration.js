import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import { FaPrint,FaArrowLeft} from "react-icons/fa";
import './ViewRegistration.css';

const ViewRegistration = ({ onBack }) => {
  const { id } = useParams(); // Get ID from URL
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/employeesAll/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("Fetched Employee Data:", data);
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

    const handlePrint = () => {
      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Employee Registration Details</title>
            <style>
              @page { 
                size: A4; 
                margin: 1cm; 
              }
              body { 
                margin: 0; 
                padding: 0;
                font-family: Arial, sans-serif;
              }
              .print-content {
                padding: 10px;
              }
              .print-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                margin-bottom: 10px;
              }
              h2, h3 { 
                text-align: center;
                margin: 5px 0;
                text-transform: uppercase;
              }
              h2 {
                font-size: 14px;
                font-weight: bold;
              }
              h3 {
                font-size: 12px;
                margin-top: 10px;
                text-decoration: underline;
              }
              .print-box {
                margin: 5px 0;
                page-break-inside: avoid;
                break-inside: avoid;
                border: 1px solid #ddd;
                padding: 5px;
                border-radius: 4px;
              }
              .print-row {
                display: flex;
                margin: 3px 0;
                align-items: center;
              }
              .print-row label {
                font-weight: bold;
                width: 120px;
                padding-right: 10px;
                font-size: 12px;
              }
              .print-row span {
                flex: 1;
                font-size: 12px;
                
                padding: 2px 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 5px 0;
                page-break-inside: avoid;
              }
              th, td {
                border: 1px solid black;
                padding: 3px;
                text-align: left;
                font-size: 11px;
              }
              th {
                background-color: #f5f5f5;
                font-weight: bold;
              }
              /* Ensure all content fits on one page */
              @page {
                margin: 0.5cm;
              }
              body {
                max-height: 100vh;
                overflow: hidden;
              }
            </style>
          </head>
          <body>
            <div class="print-content">
              <h2>MILITARY COLLEGE OF EME</h2>
              <h2>Employee Registration Details</h2>
              
              <div class="print-grid">
                <div class="print-box">
                  <h3>Basic Information</h3>
                  <div class="print-row">
                    <label>Command:</label>
                    <span>${employeeData.command|| '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>GPF/PRAN:</label>
                    <span>${employeeData.gpf_pran || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Army Number:</label>
                    <span>${employeeData.army_no || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Directorate:</label>
                    <span>${employeeData.directorate || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Designation:</label>
                    <span>${employeeData.designation || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Faculty:</label>
                    <span>${employeeData.faculty || '-'}</span>
                  </div>
                </div>
  
                <div class="print-box">
                  <h3>Personal Information</h3>
                  <div class="print-row">
                    <label>Name:</label>
                    <span>${employeeData.first_name} ${employeeData.middle_name} ${employeeData.last_name || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Gender:</label>
                    <span>${employeeData.gender || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Category:</label>
                    <span>${employeeData.category || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Religion:</label>
                    <span>${employeeData.religion || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Blood Group:</label>
                    <span>${employeeData.blood_group || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Education:</label>
                    <span>${employeeData.education || '-'}</span>
                  </div>
                </div>
  
                <div class="print-box">
                  <h3>Service Information</h3>
                  <div class="print-row">
                    <label>Date of Birth:</label>
                    <span>${formatDate(employeeData.date_of_birth) || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Date of Appointment:</label>
                    <span>${formatDate(employeeData.date_of_appointment) || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Date of Retirement:</label>
                    <span>${formatDate(employeeData.date_of_retirement) || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Mode of Appointment:</label>
                    <span>${employeeData.mode_of_appointment || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>FR 56(j):</label>
                    <span>${employeeData.fr56j || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Group:</label>
                    <span>${employeeData.employee_group || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>IND:</label>
                    <span>${employeeData.ind || '-'}</span>
                  </div>
                </div>
  
                <div class="print-box">
                  <h3>Contact Information</h3>
                  <div class="print-row">
                    <label>Mobile Number:</label>
                    <span>${employeeData.mobile_no || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Email:</label>
                    <span>${employeeData.email_id || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Permanent Address:</label>
                    <span>${employeeData.permanent_address || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Temporary Address:</label>
                    <span>${employeeData.temporary_address || '-'}</span>
                  </div>
                  <h3 style="margin-top: 15px;">Bank Details</h3>
                  <div class="print-row">
                    <label>Bank Name:</label>
                    <span>${employeeData.bank_name || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>Account Number:</label>
                    <span>${employeeData.bank_account_number || '-'}</span>
                  </div>
                  <div class="print-row">
                    <label>IFSC Code:</label>
                    <span>${employeeData.ifsc_code || '-'}</span>
                  </div>
                </div>
              </div>
  
              ${employeeData.promotions && employeeData.promotions.length > 0 ? `
                <div class="print-box">
                  <h3>Promotion Details</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${employeeData.promotions.map(promotion => `
                        <tr>
                          <td>${promotion.name || '-'}</td>
                          <td>${formatDate(promotion.date) || '-'}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}
  
              ${employeeData.probations && employeeData.probations.length> 0 ? `
                <div class="print-box">
                  <h3>Probation Details</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${employeeData.probations.map(probation => `
                        <tr>
                          <td>${probation.year || '-'}</td>
                          <td>${formatDate(probation.date) || '-'}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}
  
              ${employeeData.postings && employeeData.postings.length > 0 ? `
                <div class="print-box">
                  <h3>Posting Details</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Unit</th>
                        <th>From Date</th>
                        <th>To Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${employeeData.postings.map(posting => `
                        <tr>
                          <td>${posting.unit || '-'}</td>
                          <td>${formatDate(posting.fromDate) || '-'}</td>
                          <td>${formatDate(posting.toDate) || '-'}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}
  
              ${employeeData.familyMembers && employeeData.familyMembers.length > 0 ? `
                <div class="print-box">
                  <h3>Family Details</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Relationship</th>
                        <th>Category</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${employeeData.familyMembers.map(member => `
                        <tr>
                          <td>${member.name || '-'}</td>
                          <td>${formatDate(member.dob) || '-'}</td>
                          <td>${member.relationship || '-'}</td>
                          <td>${member.category || '-'}</td>
                          <td>${member.remarks || '-'}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
      
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      iframe.contentDocument.write(content);
      iframe.contentDocument.close();
      
      iframe.contentWindow.onafterprint = () => {
        document.body.removeChild(iframe);
      };
      
      iframe.contentWindow.print();
    };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  };

  if (loading) return <p>Loading...</p>;
  if (!employeeData) return <p>No employee data found.</p>;

  return (
    <div className="view-registration-container">
        <div className='print-button-container4 no-print'>
        <button onClick={handleBack} className="back-button4">
          <FaArrowLeft/> Back
        </button>
        <button onClick={handlePrint} className="print-button4">
            <FaPrint/> Print
        </button>
      </div>
      <div className="employee-details">
        <h2>Employee Registration Details</h2>

        <div className="print-layout">
          <div className="print-column">
            <div className="print-box">
              <h3>Basic Information</h3>
              <div className="print-content">
                
                <div className="print-row">
                  <label>Command:</label>
                  <span>{employeeData.command}</span>
                </div>
                <div className="print-row">
                  <label>GPF/PRAN:</label>
                  <span>{employeeData.gpf_pran}</span>
                </div>
                <div className="print-row">
                  <label>Army Number:</label>
                  <span>{employeeData.army_no}</span>
                </div>
                <div className="print-row">
                  <label>Directorate:</label>
                  <span>{employeeData.directorate}</span>
                </div>
                <div className="print-row">
                  <label>Designation:</label>
                  <span>{employeeData.designation}</span>
                </div>
                <div className="print-row">
                  <label>Faculty:</label>
                  <span>{employeeData.faculty}</span>
                </div>
              </div>
            </div>

            <div className="print-box">
              <h3>Personal Information</h3>
              <div className="print-content">
                <div className="print-row">
                  <label>First Name:</label>
                  <span>{employeeData.first_name}</span>
                </div>
                <div className="print-row">
                  <label>Middle Name:</label>
                  <span>{employeeData.middle_name}</span>
                </div>
                <div className="print-row">
                  <label>Last Name:</label>
                  <span>{employeeData.last_name}</span>
                </div>
                <div className="print-row">
                  <label>Gender:</label>
                  <span>{employeeData.gender}</span>
                </div>
                <div className="print-row">
                  <label>Category:</label>
                  <span>{employeeData.category}</span>
                </div>
                <div className="print-row">
                  <label>Religion:</label>
                  <span>{employeeData.religion}</span>
                </div>
                <div className="print-row">
                  <label>Blood Group:</label>
                  <span>{employeeData.blood_group}</span>
                </div>
                <div className="print-row">
                  <label>Education:</label>
                  <span>{employeeData.education}</span>
                </div>
              </div>
            </div>

            <div className="print-box">
              <h3>Contact Information</h3>
              <div className="print-content">
                <div className="print-row">
                  <label>Mobile Number:</label>
                  <span>{employeeData.mobile_no}</span>
                </div>
                <div className="print-row">
                  <label>Email:</label>
                  <span>{employeeData.email_id}</span>
                </div>
                <div className="print-row">
                  <label>Permanent Address:</label>
                  <span>{employeeData.permanent_address}</span>
                </div>
                <div className="print-row">
                  <label>Temporary Address:</label>
                  <span>{employeeData.temporary_address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="print-column">
            <div className="print-box">
              <h3>Service Information</h3>
              <div className="print-content">
                <div className="print-row">
                  <label>Date of Birth:</label>
                  <span>{formatDate(employeeData.date_of_birth)}</span>
                </div>
                <div className="print-row">
                  <label>Date of Appointment:</label>
                  <span>{formatDate(employeeData.date_of_appointment)}</span>
                </div>
                <div className="print-row">
                  <label>Date of Retirement:</label>
                  <span>{formatDate(employeeData.date_of_retirement)}</span>
                </div>
                <div className="print-row">
                  <label>Mode of Appointment:</label>
                  <span>{employeeData.mode_of_appointment}</span>
                </div>
                <div className="print-row">
                  <label>FR 56(j):</label>
                  <span>{employeeData.fr56j}</span>
                </div>
                <div className="print-row">
                  <label>Group:</label>
                  <span>{employeeData.employee_group}</span>
                </div>
                <div className="print-row">
                  <label>IND:</label>
                  <span>{employeeData.ind}</span>
                </div>
              </div>
            </div>

            <div className="print-box">
              <h3>Identification Details</h3>
              <div className="print-content">
                <div className="print-row">
                  <label>PAN Number:</label>
                  <span>{employeeData.pan_number}</span>
                </div>
                <div className="print-row">
                  <label>UID Number:</label>
                  <span>{employeeData.uid_no}</span>
                </div>
                <div className="print-row">
                  <label>Identification Marks:</label>
                  <span>{employeeData.identification_marks}</span>
                </div>
              </div>
            </div>

            <div className="print-box">
              <h3>Bank Details</h3>
              <div className="print-content">
                <div className="print-row">
                  <label>Bank Name:</label>
                  <span>{employeeData.bank_name}</span>
                </div>
                <div className="print-row">
                  <label>Account Number:</label>
                  <span>{employeeData.bank_account_number}</span>
                </div>
                <div className="print-row">
                  <label>IFSC Code:</label>
                  <span>{employeeData.ifsc_code}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="print-tables">
          {employeeData.postings && employeeData.postings.length > 0 && (
            <div className="details-section">
              <h3>Posting Details</h3>
              <div className="detail-table">
                <table>
                  <thead>
                    <tr>
                      <th>Unit</th>
                      <th>From Date</th>
                      <th>To Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.postings.map((posting, index) => (
                      <tr key={index}>
                        <td>{posting.unit || '-'}</td>
                        <td>{formatDate(posting.from_date) === "	01/01/1" ? "-" : formatDate(posting.from_date)}</td>
                        <td>{formatDate(posting.to_date) === "	01/01/1" ? "-" : formatDate(posting.to_date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {employeeData.promotions && employeeData.promotions.length > 0 && (
            <div className="details-section">
              <h3>Promotion Details</h3>
              <div className="detail-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.promotions.map((promotion, index) => (
                      <tr key={index}>
                        <td>{promotion.name || '-'}</td>
                        <td>{formatDate(promotion.date) === "01/01/1" ? "-" : formatDate(promotion.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {employeeData.probations && employeeData.probations.length > 0 && (
            <div className="details-section">
              <h3>Probation Details</h3>
              <div className="detail-table">
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.probations.map((probation, index) => (
                      <tr key={index}>
                        <td>{probation.year || '-'}</td>
                        <td>{formatDate(probation.date) === "01/01/1" ? "-" : formatDate(probation.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {employeeData.familyMembers && employeeData.familyMembers.length > 0 && (
            <div className="details-section">
              <h3>Family Details</h3>
              <div className="detail-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date of Birth</th>
                      <th>Relationship</th>
                      <th>Category</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.familyMembers.map((member, index) => (
                      <tr key={index}>
                        <td>{member.name || '-'}</td>
                        <td>{formatDate(member.dob) || '-'}</td>
                        <td>{member.relationship || '-'}</td>
                        <td>{member.category || '-'}</td>
                        <td>{member.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRegistration;