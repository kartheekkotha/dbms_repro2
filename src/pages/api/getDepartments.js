// pages/api/getStudents.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    // Fetch the list of students from the MySQL database
    const sql = 'SELECT * FROM Department';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Error fetching students' });
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    res.status(405).end();
  }
};
