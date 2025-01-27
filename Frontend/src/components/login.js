// App.js
import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import AdminPage from './FetchDetails';
// import FetchDetails from './FetchDetails';
import UserPage from './user';

// Dummy authentication data
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user1', password: 'user123', role: 'user', faculty: 'fel' },
  { username: 'user2', password: 'user456', role: 'user', faculty: 'feme' },
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
      } else if (role === 'user') {
        setPage('user');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  if (page === 'admin') return <AdminPage />;
  if (page === 'user') return <UserPage />;

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
                <option value="fel">FEL</option>
                <option value="feme">FEME</option>
                <option value="udc">UDC</option>
                <option value="ldc">LDC</option>
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