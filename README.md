# Latihan Frontend — CRUD & Autentikasi (React + Express + PostgreSQL)

## 📘 Deskripsi Proyek
Proyek ini adalah aplikasi **Fullstack CRUD dengan sistem autentikasi JWT** menggunakan:
- **Frontend:** React.js + React-Bootstrap  
- **Backend:** Express.js + PostgreSQL  
- **Autentikasi:** JWT (JSON Web Token)  
- **Fitur:** Login, Register, dan CRUD (Tambah, Edit, Hapus, Tampil Data)  
- **UI:** Tema **ungu elegan**, modern, dan responsif  

Aplikasi ini dikembangkan sebagai latihan tugas integrasi **Frontend dan Backend**.

---

## 🏗️ Struktur Project
![Struktur File](./screenshot/struktur_file.png)


---

## ⚙️ Teknologi yang Digunakan

### 🔹 Frontend
- React.js
- React Router DOM
- React Bootstrap
- Axios
- SweetAlert2 (popup interaktif)

### 🔹 Backend
- Express.js
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`)
- bcryptjs
- dotenv
- cors
- nodemon

---

## 🧰 Instalasi & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/syahmirian/latihan-frontend.git
cd latihan-frontend

2️⃣ Setup Backend
cd backend-pg
npm install


Buat file .env berdasarkan contoh .env.example:

PORT=5000
JWT_SECRET=your_secret_key_here
PGUSER=postgres
PGPASSWORD=your_password_here
PGHOST=localhost
PGPORT=5432
PGDATABASE=latihan_frontend


Buat database di PostgreSQL:

CREATE DATABASE latihan_frontend;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(200)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  description TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


Jalankan backend:

npm run dev

3️⃣ Setup Frontend
cd ..
npm install
npm start


Frontend berjalan di:
👉 http://localhost:3000

🔐 Fitur Utama
Fitur	Deskripsi
🔸 Register	Membuat akun baru
🔸 Login	Autentikasi dengan JWT
🔸 Private Route	Dashboard hanya untuk user login
🔸 CRUD	Tambah, Edit, Hapus, dan Lihat Data
🔸 Modal CRUD	Semua aksi CRUD dilakukan lewat modal
🔸 SweetAlert2	Popup sukses/gagal yang interaktif
🔸 UI clean, lembut, dan responsif

## Screenshot Aplikasi
### 🔹 Halaman Login
> Tampilan form login dan hasil login sukses
![Login](./screenshot/login.png)
![Login Sukses](./screenshot/login_sukses.png)
 ---

### 🔹 Halaman Register
> Form pendaftaran akun baru dan notifikasi registrasi sukses
![Register](./screenshot/regist.png)
![Register Sukses](./screenshot/regist_sukses.png)

---

### 🏠 Dashboard
> Tampilan dashboard utama setelah login
![Dashboard](./screenshot/dashboard.png)

---

### ➕ Tambah Data
> Modal tambah data baru dan notifikasi sukses
![Tambah Data](./screenshot/tambah_data.png)
![Sukses Tambah Data](./screenshot/sukses_tambah_data.png)

---

### ✏️ Edit Data
> Modal edit data dan hasil update sukses
![Edit](./screenshot/edit.png)
![Edit Sukses](./screenshot/edit_sukses.png)

---

### 🗑️ Hapus Data
> Konfirmasi hapus dan notifikasi sukses
![Hapus](./screenshot/hapus.png)
![Hapus Sukses](./screenshot/hapus_sukses.png)


