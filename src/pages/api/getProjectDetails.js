// pages/api/getProjects.js
import db from '../db';

export default async (req, res) => {
  const { project_id } = req.query;

  if (req.method === 'GET' && project_id) {
    try {
      // Implement your logic to fetch projects from the database based on studentId
      const sql =
        `SELECT 
          p.project_id, p.title, p.details, p.work_status, p.date_of_creation, p.department, 
          d.domain_id, d.domain_name,
          s.student_email_id, s.sname 
        FROM 
          Project p
          LEFT JOIN Project_Domain pd ON p.project_id = pd.project_id
          LEFT JOIN Domain d ON pd.domain_id = d.domain_id
          LEFT JOIN Project_Student ps ON p.project_id = ps.project_id
          LEFT JOIN Student s ON ps.student_email_id = s.student_email_id
        WHERE p.project_id = ?`;

      db.query(sql, [project_id], (err, results) => {
        if (err) {
          console.error('Error fetching projects:', err);
          res.status(500).json({ error: 'Error fetching projects' });
        } else {
          // Process the results to create a structured project list
          const projectList = results.reduce((acc, project) => {
            const existingProject = acc.find((p) => p.project_id === project.project_id);
            if (existingProject) {
              // Project already exists, add domain and student information
              if (project.domain_id) {
                existingProject.domains.push({
                  domain_id: project.domain_id,
                  domain_name: project.domain_name,
                });
              }
              if (project.student_id) {
                existingProject.students.push({
                  student_email_id: project.student_email_id,
                  sname: project.sname,
                });
              }
            } else {
              // New project, create a new project object
              const newProject = {
                project_id: project.project_id,
                title: project.title,
                details: project.details,
                work_status: project.work_status,
                date_of_creation: project.date_of_creation,
                department: project.department,
                domains: project.domain_id
                  ? [{ domain_id: project.domain_id, domain_name: project.domain_name }]
                  : [],
                students: project.student_id
                  ? [{ student_email_id: project.student_email_id, sname: project.sname }]
                  : [],
              };
              console.log(newProject);
              acc.push(newProject);
            }
            return acc;
          }, []);

          res.status(200).json(projectList);
        }
      });
    } catch (error) {
      console.error('Error in getProjects:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
};
// pages/api/getStudentProjects.js
// import db from '../db';

// export default async (req, res) => {
//   if (req.method === 'GET') {
//     const { student_email_id } = req.query;
//     const sql = 
//     `SELECT p.project_id, p.title, p.details, p.work_status, p.date_of_creation, p.department, 
//               d.domain_id, d.domain_name,
//               s.student_email_id, s.sname 
//             FROM 
//               Project p
//               LEFT JOIN Project_Domain pd ON p.project_id = pd.project_id
//               LEFT JOIN Domain d ON pd.domain_id = d.domain_id
//               LEFT JOIN Project_Student ps ON p.project_id = ps.project_id
//               LEFT JOIN Student s ON ps.student_email_id = s.student_email_id
//             WHERE s.student_email_id = ?`;
    
//     db.query(sql, [student_email_id], (err, results) => {
//       if (err) {
//         console.error('Error fetching student projects:', err);
//         res.status(500).json({ error: 'Error fetching student projects' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   } else {
//     res.status(405).end();
//   }
// };
