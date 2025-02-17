import React ,{useState} from 'react';
import Attendance from './attendance';
import Registration from './Registration';
import Leave from './LeaveManagement';
import LeaveRecord from './LeaveRecord';
function FetchDetails() {
const [activePage, setActivePage] = useState('fetchDetails');
return  (
<div className="dashboard-menu no-print">
<div className="menu-logo">
  <img src="/oip.jpg" alt="Logo" />
</div>
<button onClick={() => setActivePage('registration')}>Registration</button>
<button onClick={() => setActivePage('fetchDetails')}>Fetch Details</button>
<button onClick={() => setActivePage('attendance')}>Attendance</button>
<div className="dropdown">
  <button onClick={() => {}}>Leave</button>
  <div className="dropdown-content">
    <button onClick={() => setActivePage('leaveManagement')}>Leave Management</button>
    <button onClick={() => setActivePage('leaveRecord')}>Leave Record</button>
  </div>
</div>
<button className="logout-btn" onClick={() => {
    localStorage.removeItem('token');
    window.location.href = '/';
}}>
    Logout
</button>

      {activePage === 'attendance' && <Attendance />}
      {activePage === 'leaveManagement' && <Leave/>}
      {activePage === 'leaveRecord' && <LeaveRecord/>}
      {activePage === 'registration' && <Registration />}
</div>


);
}


export default FetchDetails;