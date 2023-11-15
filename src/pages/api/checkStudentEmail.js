// pages/api/getStudentDetails.js
import db from '../db';

export default (req, res) => {
  if (req.method === 'GET') {
    const { email } = req.query;
    console.log("Student Email ID: ", email);
    // Fetch student details using callback
    const studentQuery = 'SELECT * FROM Student WHERE student_email_id = ?';
    db.query(studentQuery, [email], (err, studentResults) => {
      if (err) {
        console.error('Error fetching student details:', err);
        res.status(500).json({ error: 'Error fetching student details' });
      } else {
        console.log("Student Results: ", studentResults);
        if (studentResults.length > 0) {
          res.status(200).json(studentResults[0]);
        } else {
          res.status(404).json({ error: 'Student not found' });
        }
      }
    });
  } else {
    res.status(405).end();
  }
};
