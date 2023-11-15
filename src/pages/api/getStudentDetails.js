// pages/api/getStudentDetails.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { student_email_id } = req.query;

    // Fetch student details
    const studentQuery = 'SELECT * FROM Student WHERE student_email_id = ?';
    db.query(studentQuery, [student_email_id], (err, studentResults) => {
      if (err) {
        console.error('Error fetching student details:', err);
        res.status(500).json({ error: 'Error fetching student details' });
      } else {
        res.status(200).json(studentResults[0]);
      }
    });
  } else {
    res.status(405).end();
  }
};
