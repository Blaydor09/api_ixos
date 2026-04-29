const db = require('../config/db');

const getListeningHistory = async (req, res) => {
  const userId = req.query.user_id; 
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await db.query(
      `SELECT h.id, h.duration_s, h.completed, h.listened_at, s.title, a.name AS artist
       FROM listening_history h
       JOIN songs s ON s.id = h.song_id
       JOIN artists a ON a.id = s.artist_id
       WHERE h.user_id = $1
       ORDER BY h.listened_at DESC LIMIT 50`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getListeningHistory };
