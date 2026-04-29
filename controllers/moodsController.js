const db = require('../config/db');

const getMoods = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM moods ORDER BY sort_order ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getMoods };
