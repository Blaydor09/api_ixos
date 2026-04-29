const db = require('../config/db');

const searchAll = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Search query "q" is required' });

  try {
    // Buscar canciones
    const songsResult = await db.query(
      `SELECT s.id, s.title, a.name AS artist, s.cover_url 
       FROM songs s JOIN artists a ON a.id = s.artist_id 
       WHERE s.title ILIKE $1 OR a.name ILIKE $1 LIMIT 10`,
      [`%${q}%`]
    );

    // Buscar artistas
    const artistsResult = await db.query(
      `SELECT id, name, image_url FROM artists WHERE name ILIKE $1 LIMIT 5`,
      [`%${q}%`]
    );

    res.json({
      songs: songsResult.rows,
      artists: artistsResult.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { searchAll };
