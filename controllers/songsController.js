const db = require('../config/db');

// Obtener todas las canciones (con soporte de búsqueda y paginación)
const getAllSongs = async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;

  try {
    let result;
    if (query) {
      // Búsqueda por título o nombre del artista
      result = await db.query(
        `SELECT s.id, s.title, a.name AS artist, s.cover_url, s.duration_s 
         FROM songs s 
         JOIN artists a ON a.id = s.artist_id 
         WHERE s.title ILIKE $1 OR a.name ILIKE $1
         LIMIT $2 OFFSET $3`,
        [`%${query}%`, limit, offset]
      );
    } else {
      result = await db.query(
        `SELECT s.id, s.title, a.name AS artist, s.cover_url, s.duration_s, s.file_path, 
        CONCAT('https://musicapi.gamobo.shop/', s.file_path) AS music_url 
         FROM songs s 
         JOIN artists a ON a.id = s.artist_id 
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtener detalles de una canción específica
const getSongById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT s.*, a.name AS artist_name, al.title AS album_title 
       FROM songs s
       LEFT JOIN artists a ON a.id = s.artist_id
       LEFT JOIN albums al ON al.id = s.album_id
       WHERE s.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllSongs,
  getSongById
};
