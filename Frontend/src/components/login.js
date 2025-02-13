// App.js
import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import AdminPage from './FetchDetails';
// import FetchDetails from './FetchDetails';
import UserPage from './UserFetchDetails';

// Dummy authentication data
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user1', password: 'user123', role: 'user', faculty: 'FEL' },
  { username: 'user2', password: 'user456', role: 'user', faculty: 'HQ Adm Wg' },
];

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [faculty, setFaculty] = useState('');
  const [page, setPage] = useState('login');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.role === role &&
        (role !== 'user' || u.faculty === faculty)
    );

    if (user) {
      setError('');
      if (role === 'admin') {
        setPage('admin');
        localStorage.setItem('currentPath', '/admin');
      } else if (role === 'user') {
        setPage('user');
        localStorage.setItem('currentPath', `/user/${faculty}`);
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  if (page === 'admin') return <AdminPage />;
  if (page === 'user') return <UserPage userFaculty={faculty} />;

  return (
    <div className="App">
      <Header />
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
            <div className="labels">
            <label htmlFor="password">Password:</label>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          {role === 'user' && (
            <div className="form-group">
              <label htmlFor="faculty">Select Faculty:</label>
              <select
                id="faculty"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option value="">Select Faculty</option>
                <option value="Budget Cell">Budget Cell</option>
              <option value="FAE">FAE</option>
              <option value="HQ Trg Wing">HQ Trg Wing</option>
              <option value="HQ Coy">HQ Coy</option>
              <option value="MTS">MTS</option>
              <option value="SDD">SDD</option>
              <option value="FEMT">FEMT</option>
              <option value="Col Adm Sectt">Col Adm Sectt</option>
              <option value="FEME">FEME</option>
              <option value="JCO Mess">JCO Mess</option>
              <option value="Offr Mess">Offr Mess</option>
              <option value="CTW">CTW</option>
              <option value="Mag 5">Mag 5</option>
              <option value="EMESA">EMESA</option>
              <option value="FDE">FDE</option>
              <option value="Comdt Sectt">Comdt Sectt</option>
              <option value="SM Br">SM Br</option>
              <option value="FEL">FEL</option>
              <option value="A Coy">A Coy</option>
              <option value="Fin Sec">Fin Sec</option>
              <option value="Est Civ Sec">Est Civ Sec</option>
              <option value="Adjt Sec">Adjt Sec</option>
              <option value="E Coy">E Coy</option>
              <option value="MTO">MTO</option>
              <option value="QM Sec">QM Sec</option>
              <option value="QM Fire Stn">QM Fire Stn</option>
              <option value="MCEME Liby">MCEME Liby</option>
              <option value="AA&QMG">AA&QMG</option>
              <option value="Est (O) Civ Sec">Est (O) Civ Sec</option>
              <option value="BSO">BSO</option>
              <option value="HQ Adm Wg">HQ Adm Wg</option>
              </select>
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;