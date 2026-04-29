const db = require('../config/db');

const getAllArtists = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM artists ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM artists WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Artist not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllArtists, getArtistById };
