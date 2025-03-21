import pool from "../db.js";

const kinderedRollController = {
  submitForm: async (req, res) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const { serviceNo, name, trade, category, childRelation, childName, 
              dateOfBirth, placeOfBirth, proofCertificate, applicationNo, 
              regnNo, dateOfRegistration, placeOfRegistration,spouseName,marriageDate,placeOfMarriage } = req.body;

      // Get the current count and year to generate pot_no
      const countResult = await client.query(
        'SELECT COUNT(*) as count FROM pto_kidmaster'
      );
      const currentYear = new Date().getFullYear();
      const count = parseInt(countResult.rows[0].count) + 1;
      const pot_no = `${count}-${currentYear}`;

      // Determine the type based on presence of spouse or child details
      const requestType = spouseName ? 'MARTIAL' : (childName ? 'KINDERED' : 'REQUEST');

      // Insert into master table with create_date
      const masterResult = await client.query(
        `INSERT INTO pto_kidmaster (pot_no, type, status, created_date,army_number) 
         VALUES ($1, $2, 'PENDING', CURRENT_DATE,$3) RETURNING pot_no`,
        [pot_no, requestType,serviceNo]
      );

      // Insert into details table
      await client.query(
        `INSERT INTO pto_kid 
         (pot_no, name, trade, category, child_relation, child_name, 
          date_of_birth, place_of_birth, proof_certificate, application_no, 
          regn_no, date_of_registration, place_of_registration,spousename,marriage_date,place_of_marriage,army_number)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
        [pot_no, name, trade, category, childRelation, childName,
         dateOfBirth, placeOfBirth, proofCertificate, applicationNo,
         regnNo, dateOfRegistration, placeOfRegistration,spouseName,marriageDate,placeOfMarriage,serviceNo]
      );

      await client.query('COMMIT');
      res.json({ success: true, message: "Record created successfully", pot_no });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error in submitForm:', error);
      res.status(500).json({ success: false, message: error.message });
    } finally {
      client.release();
    }
  },

  getRecords: async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT 
          km.pot_no,
          km.type,
          km.status,
          km.created_date,
          km.status_date,
          km.army_number,
          CASE 
            WHEN km.status = 'Rejected' THEN jsonb_build_object('army_number', kd.army_number)
            ELSE to_jsonb(kd.*)
          END as details
         FROM pto_kidmaster km 
         LEFT JOIN pto_kid kd ON km.pot_no = kd.pot_no`
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error in getRecords:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getRecordById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT 
          km.pot_no,
          km.type,
          km.status,
          km.created_date,
          km.status_date,
          km.army_number,
          to_jsonb(kd.*) as details
         FROM pto_kidmaster km 
         LEFT JOIN pto_kid kd ON km.pot_no = kd.pot_no
         WHERE km.pot_no = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Record not found" });
      }

      res.json({
        ...result.rows[0],
        ...result.rows[0].details
      });
    } catch (error) {
      console.error('Error in getRecordById:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateStatus: async (req, res) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const { id } = req.params;
      let { status } = req.body;
      
      // Capitalize first letter only
      status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

      // Update status and status_date in master table
      const masterResult = await client.query(
        `UPDATE pto_kidmaster 
         SET status = CAST($1 AS VARCHAR), 
             status_date = CASE 
                            WHEN CAST($1 AS VARCHAR) IN ('Approved', 'Rejected') THEN CURRENT_DATE 
                            ELSE NULL 
                          END
         WHERE pot_no = $2 
         RETURNING *`,
        [status, id]
      );

      if (masterResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ success: false, message: "Record not found" });
      }

      // If status is rejected, delete from pto_kid table
      if (status === 'Rejected') {
        await client.query(
          `DELETE FROM pto_kid WHERE pot_no = $1`,
          [id]
        );
      }

      await client.query('COMMIT');
      res.json({ 
        success: true, 
        message: `Request ${status} successfully${status === 'Rejected' ? ' and data removed' : ''}`,
        data: masterResult.rows[0] 
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error in updateStatus:', error);
      res.status(500).json({ success: false, message: error.message });
    } finally {
      client.release();
    }
  }
};

export default kinderedRollController;
