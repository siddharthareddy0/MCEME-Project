import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const signup = async (username, password, faculty) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            username,
            password,
            faculty
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

const getPendingUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/pending-users`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

const updateUserStatus = async (username, status, role) => {
    try {
        const response = await axios.put(
            `${API_URL}/update-user-status`,
            { username, status, role },
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

const deleteUser = async (username) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-user/${username}`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

const signupService = {
    signup,
    getPendingUsers,
    updateUserStatus,
    getAllUsers,
    deleteUser
};

export default signupService;
