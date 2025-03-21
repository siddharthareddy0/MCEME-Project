import React, { useState, useEffect } from 'react';
import signupService from '../services/signupservice';
import NavBar from './NavBar';
import './NewUsers.css';  // Reusing the same CSS

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const usersList = await signupService.getAllUsers();
            setUsers(usersList);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const handleDelete = async (username) => {
        try {
            await signupService.deleteUser(username);
            loadUsers(); // Reload the list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="new-users-container">
                <h2 className="new-users-title">User List</h2>
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
                        {users.map(user => (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.faculty}</td>
                                <td>{user.role}</td>
                                <td className="new-users-action-cell">
                                    <button 
                                        className="new-users-button new-users-button-reject"
                                        onClick={() => handleDelete(user.username)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
