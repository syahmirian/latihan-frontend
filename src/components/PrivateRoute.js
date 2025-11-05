import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // kalau belum login (tidak ada token), arahkan ke /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // kalau sudah login, tampilkan halaman (misal Dashboard)
  return children;
}

export default PrivateRoute;
