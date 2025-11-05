const express = require('express');
const { pool } = require('../db');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET semua item milik user
router.get('/', protect, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items WHERE user_id = $1 ORDER BY id ASC', [req.user]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST tambah item
router.post('/', protect, async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, req.user]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT edit item
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    const item = result.rows[0];
    if (!item) return res.status(404).json({ message: 'Item tidak ditemukan' });
    if (item.user_id !== req.user) return res.status(403).json({ message: 'Tidak diizinkan' });

    const updated = await pool.query(
      'UPDATE items SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE hapus item
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    const item = result.rows[0];
    if (!item) return res.status(404).json({ message: 'Item tidak ditemukan' });
    if (item.user_id !== req.user) return res.status(403).json({ message: 'Tidak diizinkan' });

    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.json({ message: 'Item dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
