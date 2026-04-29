const db = require('../config/db');

const getMyLikedSongs = async (req, res) => {
  // In a real app, user_id comes from JWT auth middleware (req.user.id)
  // For now, we expect it in query or body as a placeholder
  const userId = req.query.user_id; 

  if (!userId) return res.status(401).json({ error: 'Unauthorized: user_id required' });

  try {
    const result = await db.query(
      `SELECT s.id, s.title, a.name AS artist, s.cover_url, ls.liked_at
       FROM liked_songs ls
       JOIN songs s ON s.id = ls.song_id
       JOIN artists a ON a.id = s.artist_id
       WHERE ls.user_id = $1
       ORDER BY ls.liked_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getMyLikedSongs };
