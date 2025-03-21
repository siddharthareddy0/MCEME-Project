import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import authService from '../services/authService';
import signupService from '../services/signupservice';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [faculty, setFaculty] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
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

  const handleSignup = async () => {
    try {
      await signupService.signup(signupUsername, signupPassword, faculty);
      // Reset signup form
      setSignupUsername('');
      setSignupPassword('');
      setFaculty('');
      // Automatically redirect to login after signup
      setTimeout(() => {
        setShowSignup(false);
      }, 1000);
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <Notification message={notificationMessage} />
      <div className={`login-container ${!showSignup ? 'show' : ''}`}>
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
          <div className="button-container">
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </form>
      </div>

      <div className={`signup-container ${showSignup ? 'show' : ''}`}>
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="signupUsername">Username:</label>
            <input
              type="text"
              id="signupUsername"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password:</label>
            <input
              type="password"
              id="signupPassword"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="faculty">Faculty:</label>
            <select
              id="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="faculty-select"
            >
              <option value="">Select Faculty</option>
              <option value="FEL">FEL</option>
              <option value="HQ ADM">HQ ADM</option>
              <option value="BUDGET CELL">BUDGET CELL</option>
              <option value="MTO">MTO</option>
              <option value="HQ TRG">HQ TRG</option>
              <option value="FAE">FAE</option>
              <option value="MTS">MTS</option>
              <option value="SDD">SDD</option>
              <option value="FEM">FEM</option>
              <option value="COL ADM SECTT">COL ADM SECTT</option>
              <option value="FEME">FEME</option>
              <option value="JCOs MESS">JCOs MESS</option>
              <option value="OFFR MESS">OFFR MESS</option>
              <option value="CTW">CTW</option>
              <option value="MAG 5">MAG 5</option>
              <option value="EMESA">EMESA</option>
              <option value="FDE">FDE</option>
              <option value="COMDT SECTT">COMDT SECTT</option>
              <option value="SM Br">SM Br</option>
              <option value="A COY">A COY</option>
              <option value="FIN SEC">FIN SEC</option>
              <option value="EST CIV SEC">EST CIV SEC</option>
              <option value="ADJT SEC">ADJT SEC</option>
              <option value="E COY">E COY</option>
              <option value="QM SEC">QM SEC</option>
              <option value="QM FIRE STN">QM FIRE STN</option>
              <option value="MCEME LIBY">MCEME LIBY</option>
              <option value="AA&QMG">AA&QMG</option>
              <option value="EST (O) SEC">EST (O) SEC</option>
              <option value="BSO">BSO</option>
              <option value="HQ COY">HQ COY</option>
            </select>
          </div>
          <button type="button" onClick={handleSignup}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
