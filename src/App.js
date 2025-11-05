import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dashboard from './pages/Dashboard.js';
import PrivateRoute from './components/PrivateRoute.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Redirect dari root ke /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* 🔹 Tampilkan 404 untuk path yang tidak dikenal */}
        <Route path="*" element={<h3 className="text-center mt-5">404 Not Found</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
