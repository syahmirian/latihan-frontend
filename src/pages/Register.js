import React, { useState } from 'react';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!form.name || !form.email || !form.password) {
      return Swal.fire('Oops!', 'Semua field wajib diisi!', 'warning');
    }

    try {
      await api.post('/auth/register', form);
      Swal.fire({
        title: 'Registrasi Berhasil 🎉',
        text: 'Akun kamu sudah dibuat! Silakan login.',
        icon: 'success',
        confirmButtonText: 'Ke Halaman Login',
        confirmButtonColor: '#0d6efd',
      }).then(() => navigate('/login'));
    } catch (err) {
      Swal.fire('Gagal 😢', 'Email sudah terdaftar atau server error.', 'error');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <h4 className="text-center mb-4 fw-bold text-primary">Daftar Akun Baru</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" className="w-100" variant="primary">
            Daftar Sekarang
          </Button>
        </Form>
        <p className="text-center mt-3 mb-0">
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </Card>
    </Container>
  );
}

export default Register;
