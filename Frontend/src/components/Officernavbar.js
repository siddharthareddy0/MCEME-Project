import {React , useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from '../services/authService'; 
import "./Fetch.css";

function Officernavbar() {

  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();

  const Notification = ({ message }) => {
    return message ? <div className="notification">{message}</div> : null;
  };

  const handleLogout = async () => {
    try {
      await authService.logout(); 
      setNotificationMessage('Logout Successful!');
      setTimeout(() => navigate("/"), 900); 
    } catch (err) {
      console.log('Logout error:', err.message);
    }
  };

  return (
    <div className="dashboard-menu no-print">
      <Notification message={notificationMessage} />
      <div className="menu-logo">
          <img src="/image.png" alt="Logo" />
        </div>
      {/* Logo Section */}

      {/* Navigation Buttons */}
      <button onClick={() => navigate("/officerfetch")}>Fetch Details</button>
      <button onClick={()=>navigate("/officer")}>Request</button>
      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Officernavbar;
