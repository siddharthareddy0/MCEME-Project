import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Default styling

// Import all components
import Login from './components/login'; // Import Login component
import Registration from './components/Registration';
import UserFetchDetails from './components/UserFetchDetails';
import LeaveManagement from './components/LeaveManagement';
import UserAttendance from './components/UserAttendance';
import ViewRegistration from './components/ViewRegistration';
import FetchDetails from './components/FetchDetails';
// import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/user-details" element={<UserFetchDetails />} />
          <Route path="/leave-management" element={<LeaveManagement />} />
          <Route path="/attendance" element={<UserAttendance />} />
          <Route path="/view-registration" element={<ViewRegistration />} />
          <Route path="/fetch-details" element={<FetchDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
