// pages/api/getProjects.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Get sorting options, sort order, and search words from query parameters
      const { sortBy, sortOrder, searchWords, statusFilter } = req.query;

      // Build the SQL query dynamically based on the provided parameters
      let sql = `
        SELECT 
          p.project_id, p.title, p.details, p.work_status, p.date_of_creation, p.department, p.is_research,
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
      WHERE p.is_research = 1
      `;

      // Add conditions for sorting and searching
      
      if (statusFilter && statusFilter !== 'all') {
          sql += ` AND p.work_status = '${statusFilter}'`;
        }
      if (searchWords) {
          sql += `
          AND (
              p.title LIKE '%${searchWords}%'
              OR p.details LIKE '%${searchWords}%'
              OR d.domain_name LIKE '%${searchWords}%'
              OR s.sname LIKE '%${searchWords}%'
              OR pr.pname LIKE '%${searchWords}%'
              OR p.department LIKE '%${searchWords}%'
              )
              `;
            }
            
            if (sortBy && sortOrder && sortBy !== 'none' && sortOrder !== 'none') {
              sql += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
            }

            db.query(sql, [], (err, results) => {
        if (err) {
          console.error('Error fetching projects:', err);
          res.status(500).json({ error: 'Error fetching projects' });
        } else {
          // Process the results to create a structured project list
          const projectList = results.reduce((acc, project) => {
            const existingProject = acc.find((p) => p.project_id === project.project_id);
            if (existingProject) {
              // Project already exists, add domain, student, and professor information
              if (project.domain_id) {
                existingProject.domains.push({
                  domain_id: project.domain_id,
                  domain_name: project.domain_name,
                });
              } 
              if (project.student_email_id) {
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
                is_research: project.is_research,
                department: project.department,
                pname : project.pname,
                domains: project.domain_id
                  ? [{ domain_id: project.domain_id, domain_name: project.domain_name }]
                  : [],
                students: project.student_email_id
                  ? [{ student_email_id: project.student_email_id, sname: project.sname }]
                  : [],
              };
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
