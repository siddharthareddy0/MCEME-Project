import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import authService from '../services/authService';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();

  // Notification component (conditionally rendered)
  const Notification = ({ message }) => {
    return message ? <div className="notification">{message}</div> : null;
  };

  const fetchUserRole = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', { 
        method: 'GET', 
        credentials: 'include' 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.role;
      
    } catch (err) {
      console.error("Error fetching role:", err);
      setError("Failed to retrieve user role");
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      await authService.login(username, password);

      await new Promise(resolve => setTimeout(resolve, 500));

      const role = await fetchUserRole();

      if (role === "admin") {
        setNotificationMessage('Login Successful!');
        setTimeout(() => navigate("/fetch"), 900); 
      } else if (role === "user") {
        setNotificationMessage('Login Successful!');
        setTimeout(() => navigate("/userFetch"), 900); 
      } else if (role === "officer") {
        setNotificationMessage('Login Successful!');
        setTimeout(() => navigate("/officer"), 900);
      } else {
        setError("Invalid role or unauthorized access.");
        return;
      }

    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="App">
      <Notification message={notificationMessage} />
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
