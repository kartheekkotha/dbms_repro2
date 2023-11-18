// pages/api/getProjects.js
import db from '../db';

export default async (req, res) => {
  const { projectId } = req.query;
  console.log("getProjects");
  if (req.method === 'GET' && projectId) {
    try {
      // Implement your logic to fetch projects from the database based on professorID
      const sql =
        `SELECT 
          p.project_id, p.title, p.details, p.work_status, p.date_of_creation, p.is_research, p.department, 
          d.domain_id, d.domain_name,
          pr.professor_email_id, pr.pname,
          s.student_email_id,s.sname ,s.batch,s.dept_id
        FROM 
          Project p
          LEFT JOIN Project_Domain pd ON p.project_id = pd.project_id
          LEFT JOIN Domain d ON pd.domain_id = d.domain_id
          LEFT JOIN Project_Professor ps ON p.project_id = ps.project_id
          LEFT JOIN Professor pr ON ps.professor_email_id = pr.professor_email_id
          LEFT JOIN Project_Student_Professor psp ON p.project_id = psp.project_id
          LEFT JOIN Student s ON psp.student_email_id = s.student_email_id
        WHERE p.is_research = 1 and p.project_id = ?`;

      db.query(sql, [projectId], (err, results) => {
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
              if (project.student_email_id) {
                if(!existingProject.students.find((s) => s.student_id === project.student_email_id))  {
                existingProject.students.push({
                  student_id: project.student_email_id,
                  sname: project.sname,
                });
            }
              }
            } else {
              // New project, create a new project object
              const newProject = {
                project_id: project.project_id,
                title: project.title,
                details: project.details,
                work_status: project.work_status,
                date_of_creation: project.date_of_creation,
                is_research: project.is_research,
                department: project.department,
                domains: project.domain_id
                  ? [{ domain_id: project.domain_id, domain_name: project.domain_name }]
                  : [],
                students: project.student_email_id
                  ? [{ student_id: project.student_email_id, sname: project.sname }]
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
