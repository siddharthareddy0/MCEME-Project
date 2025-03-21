import React, { useState, useEffect } from 'react';
import signupService from '../services/signupservice';
import './NewUsers.css';
import NavBar from './NavBar';

function NewUsers() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [userRoles, setUserRoles] = useState({});

    useEffect(() => {
        loadPendingUsers();
    }, []);

    const loadPendingUsers = async () => {
        try {
            const users = await signupService.getPendingUsers();
            setPendingUsers(users);
            const roles = {};
            users.forEach(user => {
                roles[user.username] = 'user';
            });
            setUserRoles(roles);
        } catch (error) {
            console.error('Error loading pending users:', error);
        }
    };

    const handleRoleChange = (username, role) => {
        setUserRoles(prev => ({
            ...prev,
            [username]: role
        }));
    };

    const handleAction = async (username, status) => {
        try {
            await signupService.updateUserStatus(username, status, userRoles[username]);
            loadPendingUsers();
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
        <div>  <NavBar/>
        <div className="new-users-container">
            <h2 className="new-users-title">New User Requests</h2>
            <table className="new-users-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Faculty</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingUsers.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.faculty}</td>
                            <td>
                                <select
                                    className="new-users-select"
                                    value={userRoles[user.username]}
                                    onChange={(e) => handleRoleChange(user.username, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="officer">Officer</option>
                                </select>
                            </td>
                            <td className="new-users-action-cell">
                                <div className="new-users-button-container">
                                    <button 
                                        className="new-users-button new-users-button-accept"
                                        onClick={() => handleAction(user.username, 'approved')}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        className="new-users-button new-users-button-reject"
                                        onClick={() => handleAction(user.username, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default NewUsers;
