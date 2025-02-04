import React, { useState } from 'react';
import './Registration.css';

const Notification = ({ message }) => {
    return (
        <div className="notification">
            {message}
        </div>
    );
};

const Registration = () => {
    const initialPromotionData = { name: '', date: '' };
    const initialPostingData = { unit: '', fromDate: '', toDate: '' };
    const initialProbationData = { year: '', date: '' };
    const initialFamilyMemberData = { 
        name: '', 
        dob: '', 
        relationship: '',
        category: '',
        remarks: ''
    };

    const [formData, setFormData] = useState({
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
        penalty: 'no',
        penaltyRemarks: '',
        mobileNo: '',
        emailId: '',
        uidNo: '',
        macp: '',
        promotion: 'no',
        promotions: [initialPromotionData],
        permanentAddress: '',
        temporaryAddress: '',
        discpCases: 'no',
        discpRemarks: '',
        probationPeriod: 'no',
        probations: [initialProbationData],
        confirmedDate: '',
        familyMembers: [initialFamilyMemberData],
        ltcTaDa: '',
        toaSosInMceme: '',
        payLevel: '',
        basicPay: '',
        postings: [initialPostingData]
    });

    const [notificationMessage, setNotificationMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePromotionAdd = () => {
        setFormData(prev => ({
            ...prev,
            promotions: [...prev.promotions, initialPromotionData]
        }));
    };

    const handlePromotionChange = (index, field, value) => {
        setFormData(prev => {
            const newPromotions = [...prev.promotions];
            newPromotions[index] = { ...newPromotions[index], [field]: value };
            return { ...prev, promotions: newPromotions };
        });
    };

    const handlePromotionDelete = (indexToDelete) => {
        setFormData(prev => ({
            ...prev,
            promotions: prev.promotions.filter((_, index) => index !== indexToDelete)
        }));
    };

    const handlePostingAdd = () => {
        setFormData(prev => ({
            ...prev,
            postings: [...prev.postings, initialPostingData]
        }));
    };

    const handlePostingChange = (index, field, value) => {
        setFormData(prev => {
            const newPostings = [...prev.postings];
            newPostings[index] = { ...newPostings[index], [field]: value };
            return { ...prev, postings: newPostings };
        });
    };

    const handlePostingDelete = (indexToDelete) => {
        setFormData(prev => ({
            ...prev,
            postings: prev.postings.filter((_, index) => index !== indexToDelete)
        }));
    };

    const handleProbationAdd = () => {
        setFormData(prev => ({
            ...prev,
            probations: [...prev.probations, initialProbationData]
        }));
    };

    const handleProbationChange = (index, field, value) => {
        setFormData(prev => {
            const newProbations = [...prev.probations];
            newProbations[index] = { ...newProbations[index], [field]: value };
            return { ...prev, probations: newProbations };
        });
    };

    const handleProbationDelete = (indexToDelete) => {
        setFormData(prev => ({
            ...prev,
            probations: prev.probations.filter((_, index) => index !== indexToDelete)
        }));
    };

    const handleFamilyMemberAdd = () => {
        setFormData(prev => ({
            ...prev,
            familyMembers: [...prev.familyMembers, initialFamilyMemberData]
        }));
    };

    const handleFamilyMemberChange = (index, field, value) => {
        setFormData(prev => {
            const newFamilyMembers = [...prev.familyMembers];
            newFamilyMembers[index] = { ...newFamilyMembers[index], [field]: value };
            return { ...prev, familyMembers: newFamilyMembers };
        });
    };

    const handleFamilyMemberDelete = (indexToDelete) => {
        setFormData(prev => ({
            ...prev,
            familyMembers: prev.familyMembers.filter((_, index) => index !== indexToDelete)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setNotificationMessage('Form Submitted Successfully!');
        setTimeout(() => setNotificationMessage(''), 2000); // Hide after 3 seconds
    };

    const handleUpdate = () => {
        console.log('Updating Form Data:', formData);
        setNotificationMessage('Form Updated Successfully!');
        setTimeout(() => setNotificationMessage(''), 2000); // Hide after 3 seconds
    };

    return (
        <div>
            {notificationMessage && <Notification message={notificationMessage} />}
            <div className="registration-container">
                <form onSubmit={handleSubmit} className="registration-form">
                    <h2>Employee Registration Form</h2>

                    {/* Line 1 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Command</label>
                            <input type="text" name="command" value={formData.command} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>GPF/PRAN</label>
                            <input type="text" name="gpfPran" value={formData.gpfPran} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Directorate</label>
                            <input type="text" name="directorate" value={formData.directorate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Group</label>
                            <select name="group" value={formData.group} onChange={handleChange}>
                                <option value="">Select Group</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                            </select>
                        </div>
                    </div>

                    {/* Line 2 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Army Number</label>
                            <input type="text" name="armyNo" value={formData.armyNo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <select name="designation" value={formData.designation} onChange={handleChange}>
                            <option value="">Select Designation</option>
                            <option value="barber">Barber</option>
                            <option value="book_binder">Book Binder</option>
                            <option value="c&j">C&J</option>
                            <option value="cine_proj_mate">Cine Proj Mate</option>
                            <option value="cmd_gde_i">CMD Gde I</option>
                            <option value="cmd_gde_ii">CMD Gde II</option>
                            <option value="cmd_og">CMD OG</option>
                            <option value="cook">Cook</option>
                            <option value="fbp">FBP</option>
                            <option value="fireman">Fireman</option>
                            <option value="fitter">Fitter</option>
                            <option value="foreman">Foreman</option>
                            <option value="inst_mech">Inst Mech</option>
                            <option value="lab_asst">Lab Asst</option>
                            <option value="lab_attd">Lab Attd</option>
                            <option value="lab_demo">Lab Demo</option>
                            <option value="ldc">LDC</option>
                            <option value="lh_nt">LH (NT)</option>
                            <option value="machinist">Machinist</option>
                            <option value="moulder">Moulder</option>
                            <option value="mts_chowk">MTS (Chow)</option>
                            <option value="mts_daftry">MTS (Daftry)</option>
                            <option value="mts_mali">MTS (Mali)</option>
                            <option value="mts_msgr">MTS (Msgr)</option>
                            <option value="mts_sfwi">MTS (Sfwi)</option>
                            <option value="o_supdt">O/Supdt</option>
                            <option value="painter_dec">Painter & Dec</option>
                            <option value="pattern_maker">Pattern Maker</option>
                            <option value="photographer">Photographer</option>
                            <option value="poster_artist">Poster Artist</option>
                            <option value="snr_dtmn">Snr Dtmn</option>
                            <option value="spvr_nt">Spvr (NT)</option>
                            <option value="steno_gde_i">Steno Gde I</option>
                            <option value="steno_gde_ii">Steno Gde II</option>
                            <option value="store_keeper">Store Keeper</option>
                            <option value="tailor">Tailor</option>
                            <option value="tcm">TCM</option>
                            <option value="tcs">TCS</option>
                            <option value="tdsman_mate">Tdsman Mate</option>
                            <option value="udc">UDC</option>
                            <option value="washerman">Washerman</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Faculty</label>
                            <select name="faculty" value={formData.faculty} onChange={handleChange}>
                            <option value="">Select Faculty</option>
                            <option value="budget_cell">Budget Cell</option>
                            <option value="fae">FAE</option>
                            <option value="hq_trg_wng">HQ Trg Wng</option>
                            <option value="hq_coy">HQ Coy</option>
                            <option value="mts">MTS</option>
                            <option value="sdd">SDD</option>
                            <option value="femt">FEMT</option>
                            <option value="col_adm_sectt">Col Adm Sectt</option>
                            <option value="feme">FEME</option>
                            <option value="jco_mess">JCO Mess</option>
                            <option value="offr_mess">Offr Mess</option>
                            <option value="ctw">CTW</option>
                            <option value="mag_5">Mag 5</option>
                            <option value="emesa">EMESA</option>
                            <option value="fde">FDE</option>
                            <option value="comdt_sectt">Comdt Sectt</option>
                            <option value="sm_br">SM Br</option>
                            <option value="fel">FEL</option>
                            <option value="a_coy">A Coy</option>
                            <option value="fin_sec">Fin Sec</option>
                            <option value="est_civ_sec">Est Civ Sec</option>
                            <option value="adjt_sec">Adjt Sec</option>
                            <option value="e_coy">E Coy</option>
                            <option value="mto">MTO</option>
                            <option value="qm_sec">QM Sec</option>
                            <option value="qm_fire_stn">QM Fire Stn</option>
                            <option value="mceme_lby">MCEME Lby</option>
                            <option value="aa&qmg">AA&QMG</option>
                            <option value="est_o_civ_sec">Est (O) Civ Sec</option>
                            <option value="bso">BSO</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ind/Non-Ind</label>
                            <select name="ind" value={formData.ind} onChange={handleChange}>
                                <option value="">Select </option>
                                <option value="a">Industrial</option>
                                <option value="b">Non-Industrial</option>
                            </select>
                        </div>
                    </div>

                    {/* Line 3 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Middle Name</label>
                            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Line 4 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="not-prefer">Prefer not to say</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Caste</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="">Select Caste</option>
                            <option value="general">General</option>
                            <option value="obc">OBC</option>
                            <option value="sc">SC</option>
                            <option value="st">ST</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Religion</label>
                            <select name="religion" value={formData.religion} onChange={handleChange}>
                                <option value="">Select Religion</option>
                                <option value="hindu">Hindu</option>
                                <option value="muslim">Muslim</option>
                            </select>
                        </div>
                    </div>

                    {/* Line 5 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date of Appointment</label>
                            <input type="date" name="dateOfAppointment" value={formData.dateOfAppointment} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date of Retirement</label>
                            <input type="date" name="dateOfRetirement" value={formData.dateOfRetirement} onChange={handleChange} />
                        </div>
                    </div>

                    {/* New Personal Details */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Education</label>
                            <input type="text" name="education" value={formData.education} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="O+">O+</option>
                                <option value="A-">A-</option>
                                <option value="B-">B-</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>PAN Number</label>
                            <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Identification Marks */}
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Identification Marks</label>
                            <textarea 
                                name="identificationMarks" 
                                value={formData.identificationMarks} 
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    {/* Verification Details */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Police Verification No</label>
                            <input type="text" name="policeVerificationNo" value={formData.policeVerificationNo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Police Verification Date</label>
                            <input type="date" name="policeVerificationDate" value={formData.policeVerificationDate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Marriage DO Pt II</label>
                            <input type="text" name="marriageDoPtII" value={formData.marriageDoPtII} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Kindred Roll DO Pt II</label>
                            <input type="text" name="kindredRollDoPtII" value={formData.kindredRollDoPtII} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="form-section">
                        <h3>Bank Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Account Number</label>
                                <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Bank Name</label>
                                <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>IFSC Code</label>
                                <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Line 6 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Mode of Appointment</label>
                            <select name="modeOfAppointment" value={formData.modeOfAppointment} onChange={handleChange}>
                                <option value="">Select Mode</option>
                                <option value="direct">Direct</option>
                                <option value="promotion">Promotion</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>FR56(J)</label>
                            <input type="text" name="fr56j" value={formData.fr56j} onChange={handleChange} placeholder="If applicable" />
                        </div>
                        
                    </div>

                    {/* Line 7 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Court Case against GOI</label>
                            <select name="courtCase" value={formData.courtCase} onChange={handleChange}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        {formData.courtCase === 'yes' && (
                            <div className="form-group">
                                <label>Name of Court</label>
                                <input type="text" name="courtName" value={formData.courtName} onChange={handleChange} />
                            </div>
                        )}
                    </div>

                    {/* Line 8 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Penalty</label>
                            <select name="penalty" value={formData.penalty} onChange={handleChange}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        {formData.penalty === 'yes' && (
                            <div className="form-group full-width">
                                <label>Penalty Remarks</label>
                                <textarea name="penaltyRemarks" value={formData.penaltyRemarks} onChange={handleChange}></textarea>
                            </div>
                        )}
                    </div>

                    {/* Line 9 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>UID Number</label>
                            <input type="text" name="uidNo" value={formData.uidNo} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Line 10 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>MACP</label>
                            <select name="macp" value={formData.macp} onChange={handleChange}>
                                <option value="">Select MACP</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                            </select>
                        </div>
                    </div>

                    {/* Line 11 - Promotions */}
                    <div className="form-section">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Promotion</label>
                                <select name="promotion" value={formData.promotion} onChange={handleChange}>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                        </div>
                        {formData.promotion === 'yes' && (
                            <div className="promotions-container">
                                {formData.promotions.map((promotion, index) => (
                                    <div key={index} className="dynamic-row">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Promotion Name</label>
                                                <input
                                                    type="text"
                                                    value={promotion.name}
                                                    onChange={(e) => handlePromotionChange(index, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Date of Promotion</label>
                                                <input
                                                    type="date"
                                                    value={promotion.date}
                                                    onChange={(e) => handlePromotionChange(index, 'date', e.target.value)}
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                className="delete-button"
                                                onClick={() => handlePromotionDelete(index)}
                                                title="Delete"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={handlePromotionAdd} className="add-button">
                                    Add Promotion
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Line 12 - Addresses */}
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Permanent Address</label>
                            <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange}></textarea>
                        </div>
                        <div className="form-group full-width">
                            <label>Temporary Address</label>
                            <textarea name="temporaryAddress" value={formData.temporaryAddress} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* Line 13 - DISCP Cases */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>DISCP Cases</label>
                            <select name="discpCases" value={formData.discpCases} onChange={handleChange}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        {formData.discpCases === 'yes' && (
                            <div className="form-group full-width">
                                <label>DISCP Remarks</label>
                                <textarea name="discpRemarks" value={formData.discpRemarks} onChange={handleChange}></textarea>
                            </div>
                        )}
                    </div>

                    {/* Line 14 - Probation */}
                    <div className="form-section">
                        <h3>Probation Period</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Probation Period</label>
                                <select name="probationPeriod" value={formData.probationPeriod} onChange={handleChange}>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                        </div>
                        {formData.probationPeriod === 'yes' && (
                            <div className="probation-container">
                                {formData.probations.map((probation, index) => (
                                    <div key={index} className="dynamic-row">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>{`Year ${index + 1} of Probation`}</label>
                                                <input
                                                    type="date"
                                                    value={probation.date}
                                                    onChange={(e) => handleProbationChange(index, 'date', e.target.value)}
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                className="delete-button"
                                                onClick={() => handleProbationDelete(index)}
                                                title="Delete"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={handleProbationAdd} className="add-button">
                                    Add Probation Year
                                </button>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Confirmed Date</label>
                                        <input type="date" name="confirmedDate" value={formData.confirmedDate} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Line 15 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>LTC/TA/DA</label>
                            <input type="text" name="ltcTaDa" value={formData.ltcTaDa} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>TOA/SOS in MCEME</label>
                            <input type="text" name="toaSosInMceme" value={formData.toaSosInMceme} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Pay Level</label>
                            <select name="payLevel" value={formData.payLevel} onChange={handleChange}>
                                {[...Array(9)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Basic Pay</label>
                            <input type="number" name="basicPay" value={formData.basicPay} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Line 16 - Postings */}
                    <div className="form-section">
                        <h3>Postings</h3>
                        {formData.postings.map((posting, index) => (
                            <div key={index} className="dynamic-row posting-row">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Unit</label>
                                        <input
                                            type="text"
                                            value={posting.unit}
                                            onChange={(e) => handlePostingChange(index, 'unit', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>From Date</label>
                                        <input
                                            type="date"
                                            value={posting.fromDate}
                                            onChange={(e) => handlePostingChange(index, 'fromDate', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>To Date</label>
                                        <input
                                            type="date"
                                            value={posting.toDate}
                                            onChange={(e) => handlePostingChange(index, 'toDate', e.target.value)}
                                        />
                                    </div>
                                    <button 
                                        type="button" 
                                        className="delete-button"
                                        onClick={() => handlePostingDelete(index)}
                                        title="Delete"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handlePostingAdd} className="add-button">
                            Add Posting
                        </button>
                    </div>

                    {/* Family Details Section */}
                    <div className="form-section">
                        <h3>Family Details</h3>
                        {formData.familyMembers.map((member, index) => (
                            <div key={index} className="family-member-container">
                                <div className="section-header">
                                    <h4>Family Member {index + 1}</h4>
                                    <div className="spacer"></div>
                                    <button 
                                        type="button" 
                                        className="delete-button"
                                        onClick={() => handleFamilyMemberDelete(index)}
                                        title="Delete"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            value={member.dob}
                                            onChange={(e) => handleFamilyMemberChange(index, 'dob', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Relationship</label>
                                        <select
                                            value={member.relationship}
                                            onChange={(e) => handleFamilyMemberChange(index, 'relationship', e.target.value)}
                                        >
                                            <option value="">Select Relationship</option>
                                            <option value="spouse">Spouse</option>
                                            <option value="child">Child</option>
                                            <option value="parent">Parent</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            value={member.category}
                                            onChange={(e) => handleFamilyMemberChange(index, 'category', e.target.value)}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="general">General</option>
                                            <option value="obc">OBC</option>
                                            <option value="sc">SC</option>
                                            <option value="st">ST</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row remarks-row">
                                    <div className="form-group full-width">
                                        <label>Remarks</label>
                                        <textarea
                                            value={member.remarks}
                                            onChange={(e) => handleFamilyMemberChange(index, 'remarks', e.target.value)}
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleFamilyMemberAdd} className="add-button">
                            Add Family Member
                        </button>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">Submit</button>
                        <button type="button" className="update-button" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;