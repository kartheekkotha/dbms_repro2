// pages/api/domains.js
import db from '../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { dept_id } = req.query;

    if (!dept_id) {
      return res.status(400).json({ error: 'Missing dept_id parameter' });
    }

    const sql = 'SELECT * FROM Domain WHERE department = ?';
    db.query(sql, [dept_id], (err, results) => {
      if (err) {
        console.error('Error fetching domains:', err);
        res.status(500).json({ error: 'Error fetching domains' });
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    res.status(405).end();
  }
};
