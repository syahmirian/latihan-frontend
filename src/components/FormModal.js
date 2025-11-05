import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function FormModal({ show, handleClose, form, setForm, handleSave, editId }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editId ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Judul</Form.Label>
            <Form.Control
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
