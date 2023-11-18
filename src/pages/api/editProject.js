import db from '../db';

export default (req, res) => {
  if (req.method === 'POST') {
    const { project_id, project_title, project_work_status, project_details } = req.body;

    try {
      // Assuming 'project_details' is a plain text detail entered by the user
      const updateProjectSQL = 'CALL UpdateProject(?, ?, ?, ?)';
      
      db.query(updateProjectSQL, [project_id, project_title, project_details, project_work_status], (err, results) => {
        if (err) {
          console.error('Error updating project details:', err);
          res.status(500).json({ error: 'Error updating project details' });
        } else {
          res.status(200).json({ message: 'Project details updated successfully' });
        }
      });
    } catch (error) {
      console.error('Error updating project details:', error);
      res.status(500).json({ error: 'Error updating project details' });
    }
  } else {
    res.status(405).end();
  }
};
