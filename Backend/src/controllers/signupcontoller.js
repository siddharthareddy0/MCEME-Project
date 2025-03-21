import pool from "../db.js";
import bcrypt from 'bcryptjs';

const signupController = {
    signup: async (req, res) => {
        try {
            const { username, password, faculty } = req.body;
            
            const userCheck = await pool.query(
                'SELECT * FROM handle WHERE username = $1',
                [username]
            );

            if (userCheck.rows.length > 0) {
                return res.json({ 
                    success: false,
                    message: 'Username already exists' 
                });
            }

            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hashSync(password, salt);

            // Insert new user with pending status
            const result = await pool.query(
                'INSERT INTO handle (username, password, faculty, status, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [username, hashedPassword, faculty, 'pending', null]
            );

            res.json({ 
                success: true,
                message: 'User registration pending approval',
                data: result.rows[0]
            });
        } catch (error) {
            console.error('Error in signup:', error);
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    },

    getPendingUsers: async (req, res) => {
        try {
            const result = await pool.query(
                'SELECT username, faculty, status FROM handle WHERE status = $1',
                ['pending']
            );
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateUserStatus: async (req, res) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { username, status, role } = req.body;

            if (status === 'approved') {
                const userData = await client.query(
                    'SELECT username, password, faculty FROM handle WHERE username = $1',
                    [username]
                );

                if (userData.rows.length === 0) {
                    throw new Error('User not found');
                }

                const user = userData.rows[0];

                // Ensure we're using the hashed password from handle table
                await client.query(
                    'INSERT INTO users (username, password, role, faculty) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role, faculty = EXCLUDED.faculty',
                    [user.username, user.password, role, user.faculty]
                );

                await client.query(
                    'UPDATE handle SET status = $1, role = $2 WHERE username = $3',
                    [status, role, username]
                );
            } else {
                await client.query(
                    'UPDATE handle SET status = $1, role = null WHERE username = $2',
                    [status, username]
                );
            }

            await client.query('COMMIT');
            res.json({ success: true, message: `User ${status} successfully` });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error in updateUserStatus:', error);
            res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const result = await pool.query(
                'SELECT u.username, u.faculty, u.role FROM users u WHERE u.username != $1 ORDER BY u.username',
                ['admin']  // Exclude admin user from the list
            );
            res.json(result.rows);
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { username } = req.params;

            // Delete from users table
            await client.query('DELETE FROM users WHERE username = $1', [username]);
            // Delete from handle table
            await client.query('DELETE FROM handle WHERE username = $1', [username]);

            await client.query('COMMIT');
            res.json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error in deleteUser:', error);
            res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    }
};

export default signupController;
