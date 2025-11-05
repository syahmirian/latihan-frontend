import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import api from '../api/api.js';
import FormModal from '../components/FormModal.js';
import AppNavbar from '../components/Navbar.js';
import Swal from 'sweetalert2';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch {
      Swal.fire('Gagal!', 'Gagal mengambil data dari server', 'error');
    }
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await api.put(`/items/${editId}`, form);
        Swal.fire('Sukses!', 'Data berhasil diperbarui!', 'success');
      } else {
        await api.post('/items', form);
        Swal.fire('Sukses!', 'Data berhasil ditambahkan!', 'success');
      }
      fetchData();
      setShow(false);
      setForm({ title: '', description: '' });
      setEditId(null);
    } catch {
      Swal.fire('Error!', 'Gagal menyimpan data', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Data akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/items/${id}`);
        Swal.fire('Terhapus!', 'Data berhasil dihapus', 'success');
        fetchData();
      } catch {
        Swal.fire('Error!', 'Gagal menghapus data', 'error');
      }
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description });
    setEditId(item.id);
    setShow(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Dashboard</h3>
          <Button onClick={() => setShow(true)}>Tambah Data</Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <FormModal
          show={show}
          handleClose={() => setShow(false)}
          form={form}
          setForm={setForm}
          handleSave={handleSave}
          editId={editId}
        />
      </Container>
    </>
  );
}

export default Dashboard;
