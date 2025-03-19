import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from '../services/authService'; 
import "./Fetch.css";

function NavBar() {

  const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
  const [showPartIIDropdown, setShowPartIIDropdown] = useState(false);
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
      <button onClick={() => navigate("/registration")}>Registration</button>
      <button onClick={() => navigate("/fetch")}>Fetch Details</button>
      <button onClick={() => navigate("/attendance")}>Attendance</button>

      {/* Leave Dropdown */}
      <div
        className="leave-dropdown-container"
        onMouseEnter={() => setShowLeaveDropdown(true)}
        onMouseLeave={() => setShowLeaveDropdown(false)}
      > 
        <button
          className={`leave-button ${showLeaveDropdown ? "active" : ""}`}
          onClick={() => setShowLeaveDropdown(!showLeaveDropdown)}
        >
          Leave
        </button>
        {showLeaveDropdown && (
          <div className="leave-dropdown-menu">
            <button onClick={() => navigate("/leaveManagement")}>
              Leave Management
            </button>
            <button onClick={() => navigate("/leaveRecord")}>
              Leave Record
            </button>
          </div>
        )}
      </div>


  {/* Part-II Order Dropdown */}
  <div
        className="leave-dropdown-container"
        onMouseEnter={() => setShowPartIIDropdown(true)}
        onMouseLeave={() => setShowPartIIDropdown(false)}
      >
        <button
          className={`leave-button ${showPartIIDropdown ? "active" : ""}`}
          onClick={() => setShowPartIIDropdown(!showPartIIDropdown)}
        >
          Part-II Order
        </button>
        {showPartIIDropdown && (
          <div className="leave-dropdown-menu">
            <button onClick={() => navigate("/kinderedroll")}>
              Kindered Roll
            </button>
            <button onClick={() => navigate("/marital-status")}>
              Marital Status
            </button>
            <button onClick={() => navigate("/retired")}>
              Retirements
            </button>
            <button onClick={() => navigate("/status")}>
              Status
            </button>
          </div>
        )}
      </div>

      <button onClick={() => navigate("/manpower")}>ManPower</button>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;
