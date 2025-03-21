import pool from "../db.js";

const retirementController = {
    async getRetirementsByYear(req, res) {
        try {
            const { year, type, category } = req.query;
            
            let query = `
                SELECT * FROM employees 
                WHERE 1=1
            `;
            
            const values = [];
            let paramCount = 1;
            
            if (year) {
                query += ` AND EXTRACT(YEAR FROM date_of_retirement) = $${paramCount}`;
                values.push(year);
                paramCount++;
            }
            
            if (type) {
                query += ` AND ind = $${paramCount}`;
                values.push(type);
                paramCount++;
            }
            
            if (category) {
                query += ` AND category = $${paramCount}`;
                values.push(category);
                paramCount++;
            }
            
            query += ` ORDER BY date_of_retirement`;

            const result = await pool.query(query, values);
            res.json(result.rows);
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

export default retirementController;
