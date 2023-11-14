// pages/api/insertProfessor.js
import db from '../db';
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds, higher values increase security but also processing time

export default async (req, res) => {
  if (req.method === 'POST') {
    const { professor_name, password, professor_email_id, dept_id } = req.body;
    console.log("Professor_name", professor_name);

    // Assuming 'password' is the plain text password entered by the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const usersql = 'INSERT INTO ProfessorUser (email_id, password) VALUES (?, ?)';
    const sql = 'INSERT INTO Professor (pname, professor_email_id, dept_id) VALUES (?, ?, ?)';

    db.query(sql, [professor_name, professor_email_id, dept_id], (err, results) => {
      if (err) {
        console.error('Error inserting data into Professor table:', err);
        res.status(500).json({ error: 'Error inserting data into Professor table' });
      } else {
        // If the insertion into the Professor table is successful
        db.query(usersql, [professor_email_id, hashedPassword], (err, results) => {
          if (err) {
            console.error('Error inserting data into ProfessorUser table:', err);
            res.status(500).json({ error: 'Error inserting data into ProfessorUser table' });
          } else {
            // If the insertion into the ProfessorUser table is successful
            res.status(200).json({ message: 'Data inserted successfully' });
          }
        });
      }
    });
  } else {
    res.status(405).end();
  }
};
