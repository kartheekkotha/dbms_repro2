// pages/api/getProjects.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { sortBy, sortOrder, searchWords, statusFilter, departmentFilter, domainFilter } = req.query;
      console.log("domainFilter",domainFilter);
      let sql = `
        SELECT 
          p.project_id, p.title, p.details, p.work_status, p.date_of_creation, p.department, p.is_research,
          d.domain_id, d.domain_name,
          s.student_email_id, s.sname,
          pr.professor_email_id, pr.pname
        FROM 
          Project p
          LEFT JOIN Project_Domain pd ON p.project_id = pd.project_id
          LEFT JOIN Domain d ON pd.domain_id = d.domain_id
          LEFT JOIN Project_Student ps ON p.project_id = ps.project_id
          LEFT JOIN Student s ON ps.student_email_id = s.student_email_id
          LEFT JOIN Project_Professor pp ON p.project_id = pp.project_id
          LEFT JOIN Professor pr ON pp.professor_email_id = pr.professor_email_id
        WHERE p.is_research = 0
      `;

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
        )`;
      }

      if (departmentFilter && departmentFilter !== 'all') {
        sql += ` AND p.department = '${departmentFilter}'`;
      }
      if (domainFilter && typeof domainFilter === 'string') {
        const domainFilterArray = domainFilter.split(',');
        const domainFilterConditions = domainFilterArray.map((domain) => `d.domain_id = '${domain}'`).join(' OR ');
        sql += ` AND (${domainFilterConditions})`;
      }
      if (sortBy && sortOrder && sortBy !== 'none' && sortOrder !== 'none') {
        sql += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
      }

      db.query(sql, [], (err, results) => {
        if (err) {
          console.error('Error fetching projects:', err);
          res.status(500).json({ error: 'Error fetching projects' });
        } else {
          const projectList = results.reduce((acc, project) => {
            const existingProject = acc.find((p) => p.project_id === project.project_id);
            if (existingProject) {
              if (project.domain_id) {
                existingProject.domains.push({
                  domain_id: project.domain_id,
                  domain_name: project.domain_name,
                });
              } else if (project.student_email_id) {
                existingProject.students.push({
                  student_email_id: project.student_email_id,
                  sname: project.sname,
                });
              } else if (project.professor_email_id) {
                existingProject.professors.push({
                  professor_email_id: project.professor_email_id,
                  pname: project.pname,
                });
              }
            } else {
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
                  ? [{ student_email_id: project.student_email_id, sname: project.sname }]
                  : [],
                professors: project.professor_email_id
                  ? [{ professor_email_id: project.professor_email_id, pname: project.pname }]
                  : [],
                role: project.student_email_id ? 'Student' : 'Professor',
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
