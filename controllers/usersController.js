const db = require('../config/db');

// Listar todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, display_name, avatar_url, created_at FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Crear un usuario
const createUser = async (req, res) => {
  const { username, email, display_name, avatar_url } = req.body;
  
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO users (username, email, display_name, avatar_url) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, display_name, avatar_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') { // unique violation en postgres
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtener las canciones que le gustan a un usuario
const getLikedSongs = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT s.id, s.title, a.name AS artist, s.cover_url, ls.liked_at
       FROM liked_songs ls
       JOIN songs s ON s.id = ls.song_id
       JOIN artists a ON a.id = s.artist_id
       WHERE ls.user_id = $1
       ORDER BY ls.liked_at DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getLikedSongs
};
