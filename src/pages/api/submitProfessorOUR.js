// pages/api/submitProject.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
    console.log(req.body)
      const { title, details, department, domains, professor_id, status, date_of_creation, student_emails } = req.body;

      // Start a trasaction
      db.beginTransaction((err) => {
        if (err) {
          throw err;
        }

        // Insert data into the Project table
        const projectSql =
          'INSERT INTO Project (department, title, details, is_research, work_status, date_of_creation) VALUES (?, ?, ?, ?, ?, ?)';
        const projectValues = [department, title, details, 1, status, date_of_creation];

        db.query(projectSql, projectValues, (err, projectResult) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting project data:', err);
              res.status(500).json({ error: 'Error inserting project data' });
            });
          }
          else{
            console.log("Project Inserted")
          }

          const projectId = projectResult.insertId;
        
        // Insert data into the Project_Student table
        const professorSQL =
        'INSERT INTO Project_Professor (project_id, professor_email_id) VALUES (?, ?)';
        db.query(professorSQL, [projectId, professor_id], (err) => {
        if (err) {
            return db.rollback(() => {
            console.error('Error inserting project student data:', err);
            res
                .status(500)
                .json({ error: 'Error inserting project student data' });
            });
        }
        else{
            console.log("Project Professor Inserted")
        }
        //   // Insert data into the Project_Student table
        //   const studentSql =
        //     'INSERT INTO Project_Student (project_id, professor_id) VALUES (?, ?)';
        //   students.forEach((student) => {
        //     db.query(studentSql, [projectId, student], (err) => {
        //       if (err) {
        //         return db.rollback(() => {
        //           console.error('Error inserting project student data:', err);
        //           res
        //             .status(500)
        //             .json({ error: 'Error inserting project student data' });
        //         });
        //       }
        //     });
        //   });

        const projectStudentProfessorSQL =
        'INSERT INTO Project_Student_Professor (project_id, student_email_id, professor_email_id) VALUES (?, ?, ?)';
        if (student_emails && student_emails.length > 0) {
        student_emails.forEach((email) => {
        db.query(projectStudentProfessorSQL, [projectId, email, professor_id], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting project student data:', err);
              res
                .status(500)
                .json({ error: 'Error inserting project student data' });
            });
          }
          else{
            console.log("Project Student Professor Inserted")
          }
        });
      });
    }
          // Insert data into the Project_Domain table
          const domainSql =
            'INSERT INTO Project_Domain (project_id, domain_id) VALUES (?, ?)';
          domains.forEach((domain) => {
            db.query(domainSql, [projectId, domain], (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error('Error inserting project domain data:', err);
                  res
                    .status(500)
                    .json({ error: 'Error inserting project domain data' });
                });
              }
              else{
                console.log("Project Domain Inserted")
              }
            });
          });

          // Commit the transaction
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.error('Error committing transaction:', err);
                res.status(500).json({ error: 'Error committing transaction' });
              });
            }
            res.status(200).json({ message: 'Project submitted successfully' });
          });
        });
      });
    });
    } catch (error) {
      console.error('Error in submitProject:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
};
