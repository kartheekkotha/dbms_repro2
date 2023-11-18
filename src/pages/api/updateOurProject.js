import db from '../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const {
      project_id,
      professor_email_id,
      student_email_id_1,
      student_email_id_2,
      title,
      details,
      work_status,
    } = req.body;

    try {
      // Update Project table
      console.log('Update Project table, project_id , student_email_id_1 , student_email_id_2, title, details, work_status', project_id, student_email_id_1, student_email_id_2, title, details, work_status);
      const updateProjectSQL = 'CALL UpdateProjectAndParticipants(?, ?, ?, ?, ?, ?, ?)';
      db.query(
        updateProjectSQL,
        [
          project_id,
          professor_email_id,
          student_email_id_1,
          student_email_id_2,
          title,
          details,
          work_status,
        ],
        (err, results) => {
          if (err) {
            console.error('Error updating Our Project details:', err);
            res.status(500).json({ error: 'Error updating Our Project details' });
          } else {
            res.status(200).json({ message: 'Our Project details updated successfully' });
          }
        }
      );
    } catch (error) {
      console.error('Error updating Our Project details:', error);
      res.status(500).json({ error: 'Error updating Our Project details' });
    }
  } else {
    res.status(405).end();
  }
};
