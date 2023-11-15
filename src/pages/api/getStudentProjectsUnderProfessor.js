import db from '../db';

export default async (req, res) => {
  const { student_email_id } = req.query;

  if (req.method === 'GET' && student_email_id) {
    try {
      // Implement your logic to fetch projects from the database based on studentId
      const sql =
      `SELECT
      p.project_id,
      p.title,
      p.details,
      p.department,
      p.work_status,
      p.date_of_creation,
      p.is_research,
      d.domain_id,
      d.domain_name,
      pr.pname AS professor_name
  FROM
      Project p
  JOIN
      Project_Student_Professor psp ON p.project_id = psp.project_id
  JOIN
      Project_Professor pp ON p.project_id = pp.project_id
  JOIN
      Professor pr ON pp.professor_email_id = pr.professor_email_id
  JOIN
      Project_Domain pd ON p.project_id = pd.project_id
  JOIN
      Domain d ON pd.domain_id = d.domain_id
  WHERE
      psp.student_email_id = ?`;

      db.query(sql, [student_email_id], (err, results) => {
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
                pname: project.professor_name,
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
