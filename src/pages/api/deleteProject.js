import db from '../db';

export default (req, res) => {
  if (req.method === 'DELETE') {
    const { project_id } = req.query;

    try {
      db.beginTransaction((beginTransactionErr) => {
        if (beginTransactionErr) {
          console.error('Error beginning transaction:', beginTransactionErr);
          return res.status(500).json({ error: 'Error beginning transaction' });
        }

        // Delete project details
        const deleteProjectDetailsSQL = 'DELETE FROM Project WHERE project_id = ?';
        db.query(deleteProjectDetailsSQL, [project_id], (deleteErr, results) => {
          if (deleteErr) {
            // Rollback the transaction in case of an error
            db.rollback(() => {
              console.error('Error deleting project:', deleteErr);
              res.status(500).json({ error: 'Error deleting project' });
            });
          } else {
            // Commit the transaction
            db.commit((commitErr) => {
              if (commitErr) {
                console.error('Error committing transaction:', commitErr);
                res.status(500).json({ error: 'Error committing transaction' });
              } else {
                res.status(200).json({ message: 'Project deleted successfully' });
              }
            });
          }
        });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end();
  }
};
