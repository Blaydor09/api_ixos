const db = require('../config/db');

const getPlayerState = async (req, res) => {
  const userId = req.query.user_id; 
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await db.query('SELECT * FROM player_state WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) return res.json({}); // Estado vacío
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePlayerState = async (req, res) => {
  const userId = req.body.user_id; // in real life from JWT
  const { current_song_id, position_s, repeat, shuffle } = req.body;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await db.query(
      `INSERT INTO player_state (user_id, current_song_id, position_s, repeat, shuffle, updated_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id) DO UPDATE 
       SET current_song_id = EXCLUDED.current_song_id,
           position_s = EXCLUDED.position_s,
           repeat = EXCLUDED.repeat,
           shuffle = EXCLUDED.shuffle,
           updated_at = NOW()
       RETURNING *`,
      [userId, current_song_id, position_s || 0, repeat || 'none', shuffle || false]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getPlayerState, updatePlayerState };
