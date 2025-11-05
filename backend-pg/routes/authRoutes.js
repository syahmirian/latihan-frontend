const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { pool } = require('../db');

dotenv.config();
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (exist.rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashed]
    );

    res.json({ message: 'Registrasi berhasil' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userRes.rows[0];
    if (!user) return res.status(400).json({ message: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
