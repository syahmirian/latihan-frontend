import React, { useState } from 'react';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return Swal.fire('Oops!', 'Email dan password wajib diisi!', 'warning');
    }

    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);

      // popup otomatis hilang lalu redirect
      Swal.fire({
        title: 'Login Berhasil 🎉',
        text: 'Selamat datang kembali!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#f8f6ff',
        color: '#4b0082',
      });

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      Swal.fire({
        title: 'Gagal 😢',
        text: 'Email atau password salah.',
        icon: 'error',
        confirmButtonColor: '#6f42c1',
        background: '#f8f6ff',
        color: '#4b0082',
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 login-bg">
      <Card className="p-4 login-card shadow">
        <h4 className="text-center mb-4 fw-bold text-primary">Login ke Akun</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="Masukkan Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="login-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Masukkan Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="login-input"
            />
          </Form.Group>
          <Button type="submit" className="w-100 login-btn">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3 mb-0 text-secondary">
          Belum punya akun? <a href="/register" className="text-decoration-none text-primary">Daftar di sini</a>
        </p>
      </Card>
    </Container>
  );
}

export default Login;
