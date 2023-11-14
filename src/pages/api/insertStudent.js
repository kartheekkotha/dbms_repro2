// pages/api/insertStudent.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { student_name, password , student_email_id , batch , dept_id } = req.body;
    console.log("student_name",student_name);
    const usersql = 'INSERT INTO StudentUser (email_id, password) VALUES (?, ?)';
    const sql = 'INSERT INTO Student (sname, student_email_id , batch , dept_id) VALUES (?, ?, ? ,?)';
    db.query(sql, [student_name, student_email_id, batch, dept_id], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
      } else {
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
    db.query(usersql, [student_email_id, password], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Error inserting data' });
        } else {
          res.status(200).json({ message: 'Data inserted successfully' });
        }
      });
  } else {
    res.status(405).end();
  }
};
