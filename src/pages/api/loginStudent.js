// pages/api/login.js
import db from '../db'; // Update the path accordingly
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { student_email_id, password } = req.body;

    try {
      const sql = 'SELECT * FROM StudentUser WHERE email_id = ?';
      db.query(sql, [student_email_id], async (err, results) => {
        if (err) {
          console.error('Error during login:', err);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
          if (results.length > 0) {
            const { password: hashedPassword, ...userData } = results[0];
            const passwordMatch = await bcrypt.compare(password, hashedPassword);

            if (passwordMatch) {
              res.status(200).json({ success: true, user: userData });
            } else {
              res.status(401).json({ success: false, message: 'Invalid password' });
            }
          } else {
            res.status(404).json({ success: false, message: 'User not found' });
          }
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
