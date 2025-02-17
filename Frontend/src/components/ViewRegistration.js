import React from 'react';
import { FaPrint, FaArrowLeft } from "react-icons/fa";
import './ViewRegistration.css';
import Header from './Header';

const sampleData = {
  command: '',
  gpfPran: '',
  directorate: '',
  armyNo: '',
  designation: '',
  faculty: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  category: '',
  religion: '',
  dateOfBirth: '',
  dateOfAppointment: '',
  dateOfRetirement: '',
  modeOfAppointment: '',
  fr56j: '',
  group: '',
  ind: '',
  education: '',
  bloodGroup: '',
  cat: '',
  panNumber: '',
  identificationMarks: '',
  policeVerificationNo: '',
  policeVerificationDate: '',
  marriageDoPtII: '',
  kindredRollDoPtII: '',
  bankAccountNumber: '',
  bankName: '',
  ifscCode: '',
  courtCase: 'no',
  courtName: '',
  audit: 'no',
  dateofaudit: '',
  penalty: 'no',
  penaltyRemarks: '',
  mobileNo: '',
  emailId: '',
  uidNo: '',
  macp: '',
  promotion: 'no',
  promotions: [{ name: '', date: '' }],
  permanentAddress: '',
  temporaryAddress: '',
  discpCases: 'no',
  discpRemarks: '',
  probationPeriod: 'no',
  probations: [{ year: '', date: '' }],
  confirmedDate: '',
  familyMembers: [{ 
      name: '', 
      dob: '', 
      relationship: '',
      category: '',
      remarks: ''
  }],
  ltcTaDa: '',
  toaSosInMceme: '',
  payLevel: '',
  basicPay: '',
  postings: [{ unit: '', fromDate: '', toDate: '' }]
};

const ViewRegistration = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
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
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <Header />
      <div className="view-registration-container">
        <div className="print-button-container4 no-print">
          <button onClick={handleBack} className="back-button4">
            <FaArrowLeft /> Back
          </button>
          <button onClick={handlePrint} className="print-button4">
            <FaPrint /> Print
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
                    <span>{sampleData.command}</span>
                  </div>
                  <div className="print-row">
                    <label>GPF/PRAN:</label>
                    <span>{sampleData.gpfPran}</span>
                  </div>
                  <div className="print-row">
                    <label>Army Number:</label>
                    <span>{sampleData.armyNo}</span>
                  </div>
                  <div className="print-row">
                    <label>Directorate:</label>
                    <span>{sampleData.directorate}</span>
                  </div>
                  <div className="print-row">
                    <label>Designation:</label>
                    <span>{sampleData.designation}</span>
                  </div>
                  <div className="print-row">
                    <label>Faculty:</label>
                    <span>{sampleData.faculty}</span>
                  </div>
                </div>
              </div>

              <div className="print-box">
                <h3>Personal Information</h3>
                <div className="print-content">
                  <div className="print-row">
                    <label>First Name:</label>
                    <span>{sampleData.firstName}</span>
                  </div>
                  <div className="print-row">
                    <label>Middle Name:</label>
                    <span>{sampleData.middleName}</span>
                  </div>
                  <div className="print-row">
                    <label>Last Name:</label>
                    <span>{sampleData.lastName}</span>
                  </div>
                  <div className="print-row">
                    <label>Gender:</label>
                    <span>{sampleData.gender}</span>
                  </div>
                  <div className="print-row">
                    <label>Category:</label>
                    <span>{sampleData.category}</span>
                  </div>
                  <div className="print-row">
                    <label>Religion:</label>
                    <span>{sampleData.religion}</span>
                  </div>
                  <div className="print-row">
                    <label>Blood Group:</label>
                    <span>{sampleData.bloodGroup}</span>
                  </div>
                  <div className="print-row">
                    <label>Education:</label>
                    <span>{sampleData.education}</span>
                  </div>
                </div>
              </div>

              <div className="print-box">
                <h3>Contact Information</h3>
                <div className="print-content">
                  <div className="print-row">
                    <label>Mobile Number:</label>
                    <span>{sampleData.mobileNo}</span>
                  </div>
                  <div className="print-row">
                    <label>Email:</label>
                    <span>{sampleData.emailId}</span>
                  </div>
                  <div className="print-row">
                    <label>Permanent Address:</label>
                    <span>{sampleData.permanentAddress}</span>
                  </div>
                  <div className="print-row">
                    <label>Temporary Address:</label>
                    <span>{sampleData.temporaryAddress}</span>
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
                    <span>{formatDate(sampleData.dateOfBirth)}</span>
                  </div>
                  <div className="print-row">
                    <label>Date of Appointment:</label>
                    <span>{formatDate(sampleData.dateOfAppointment)}</span>
                  </div>
                  <div className="print-row">
                    <label>Date of Retirement:</label>
                    <span>{formatDate(sampleData.dateOfRetirement)}</span>
                  </div>
                  <div className="print-row">
                    <label>Mode of Appointment:</label>
                    <span>{sampleData.modeOfAppointment}</span>
                  </div>
                  <div className="print-row">
                    <label>FR 56(j):</label>
                    <span>{sampleData.fr56j}</span>
                  </div>
                  <div className="print-row">
                    <label>Group:</label>
                    <span>{sampleData.group}</span>
                  </div>
                  <div className="print-row">
                    <label>IND:</label>
                    <span>{sampleData.ind}</span>
                  </div>
                </div>
              </div>

              <div className="print-box">
                <h3>Identification Details</h3>
                <div className="print-content">
                  <div className="print-row">
                    <label>PAN Number:</label>
                    <span>{sampleData.panNumber}</span>
                  </div>
                  <div className="print-row">
                    <label>UID Number:</label>
                    <span>{sampleData.uidNo}</span>
                  </div>
                  <div className="print-row">
                    <label>Identification Marks:</label>
                    <span>{sampleData.identificationMarks}</span>
                  </div>
                </div>
              </div>

              <div className="print-box">
                <h3>Bank Details</h3>
                <div className="print-content">
                  <div className="print-row">
                    <label>Bank Name:</label>
                    <span>{sampleData.bankName}</span>
                  </div>
                  <div className="print-row">
                    <label>Account Number:</label>
                    <span>{sampleData.bankAccountNumber}</span>
                  </div>
                  <div className="print-row">
                    <label>IFSC Code:</label>
                    <span>{sampleData.ifscCode}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="print-tables">
            {sampleData.postings && sampleData.postings.length > 0 && (
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
                      {sampleData.postings.map((posting, index) => (
                        <tr key={index}>
                          <td>{posting.unit || '-'}</td>
                          <td>{formatDate(posting.fromDate) || '-'}</td>
                          <td>{formatDate(posting.toDate) || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {sampleData.promotions && sampleData.promotions.length > 0 && (
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
                      {sampleData.promotions.map((promotion, index) => (
                        <tr key={index}>
                          <td>{promotion.name || '-'}</td>
                          <td>{formatDate(promotion.date) || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {sampleData.probations && sampleData.probations.length > 0 && (
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
                      {sampleData.probations.map((probation, index) => (
                        <tr key={index}>
                          <td>{probation.year || '-'}</td>
                          <td>{formatDate(probation.date) || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {sampleData.familyMembers && sampleData.familyMembers.length > 0 && (
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
                      {sampleData.familyMembers.map((member, index) => (
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
    </div>
  );
};

export default ViewRegistration;