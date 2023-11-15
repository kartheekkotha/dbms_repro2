// pages/api/getStudentDetails.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { Professor_email_id } = req.query;
    console.log('Professor_email_id', Professor_email_id);
    // Fetch student details
    const studentQuery = 'SELECT * FROM Professor WHERE Professor_email_id = ?';
    db.query(studentQuery, [Professor_email_id], (err, ProfessorResults) => {
      if (err) {
        console.error('Error fetching student details:', err);
        res.status(500).json({ error: 'Error fetching student details' });
      } else {
        res.status(200).json(ProfessorResults[0]);
      }
    });
  } else {
    res.status(405).end();
  }
};
