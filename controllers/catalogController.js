const db = require('../config/db');

const getCatalog = async (req, res) => {
  try {
    const albums = await db.query('SELECT id, title, cover_url FROM albums ORDER BY created_at DESC LIMIT 10');
    const genres = await db.query('SELECT id, name, color_hex FROM genres');
    
    res.json({
      latest_albums: albums.rows,
      genres: genres.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getCatalog };
