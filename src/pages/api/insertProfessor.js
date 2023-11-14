// pages/api/insertStudent.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { professor_name, password , professor_email_id , dept_id } = req.body;
    console.log("Professor_name",professor_name);
    const usersql = 'INSERT INTO ProfessorUser (email_id, password) VALUES (?, ?)';
    const sql = 'INSERT INTO Professor (pname, professor_email_id  , dept_id) VALUES (?, ? ,?)';
    db.query(sql, [professor_name, professor_email_id, dept_id], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
      } else {
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
    db.query(usersql, [professor_email_id, password], (err, results) => {
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
