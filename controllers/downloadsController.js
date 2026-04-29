const db = require('../config/db');

const getDownloads = async (req, res) => {
  const userId = req.query.user_id; // Placeholder for req.user.id
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await db.query(
      `SELECT d.id, d.status, d.local_path, s.title, a.name AS artist
       FROM downloads d
       JOIN songs s ON s.id = d.song_id
       JOIN artists a ON a.id = s.artist_id
       WHERE d.user_id = $1
       ORDER BY d.downloaded_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getDownloads };
