const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Placeholder for real DB logic since users table in database.sql doesn't have a password field initially
  // For production, you'd alter the users table to have a password_hash column.
  res.json({
    message: 'Login endpoint active',
    token: jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  });
};

const register = async (req, res) => {
  const { username, email, password, display_name } = req.body;
  
  try {
    const result = await db.query(
      `INSERT INTO users (username, email, display_name) 
       VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, email, display_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = { login, register };
