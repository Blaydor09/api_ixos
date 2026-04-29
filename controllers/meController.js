const db = require('../config/db');

const getMe = async (req, res) => {
  const userId = req.query.user_id; // Placeholder for req.user.id
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await db.query('SELECT id, username, email, display_name, avatar_url FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getMe };
