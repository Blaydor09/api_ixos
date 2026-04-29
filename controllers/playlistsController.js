const db = require('../config/db');

// Obtener playlists públicas
const getPublicPlaylists = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.id, p.name, p.description, p.cover_url, p.total_songs, p.total_duration_s, u.username AS owner
       FROM playlists p
       JOIN users u ON u.id = p.owner_id
       WHERE p.visibility = 'public'
       ORDER BY p.created_at DESC
       LIMIT 50`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Crear una nueva playlist
const createPlaylist = async (req, res) => {
  const { owner_id, name, description, cover_url, visibility, mood_id } = req.body;

  if (!owner_id || !name) {
    return res.status(400).json({ error: 'owner_id and name are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO playlists (owner_id, name, description, cover_url, visibility, mood_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [owner_id, name, description, cover_url, visibility || 'private', mood_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtener canciones de una playlist
const getPlaylistSongs = async (req, res) => {
  const { id } = req.params;
  try {
    // Primero verificar que la playlist exista
    const playlistCheck = await db.query('SELECT id FROM playlists WHERE id = $1', [id]);
    if (playlistCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const result = await db.query(
      `SELECT ps.position, s.id, s.title, a.name AS artist, s.cover_url, s.duration_s
       FROM playlist_songs ps
       JOIN songs s ON s.id = ps.song_id
       JOIN artists a ON a.id = s.artist_id
       WHERE ps.playlist_id = $1
       ORDER BY ps.position ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getPublicPlaylists,
  createPlaylist,
  getPlaylistSongs
};
