const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();
const app = express();

// 🟢 Tambahkan ini sebelum routes
app.use(cors());
app.use(express.json()); // wajib biar req.body bisa dibaca
app.use(express.urlencoded({ extended: true })); // untuk form-encoded body (jaga-jaga)

app.get('/', (req, res) => res.send('API PostgreSQL 🚀'));
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
