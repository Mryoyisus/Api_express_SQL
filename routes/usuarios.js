const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET: Obtener todos los usuarios
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET: Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result[0]);
  });
});

// POST: Crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, email, edad } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ message: 'Nombre y email son obligatorios' });
  }
  const query = 'INSERT INTO usuarios (nombre, email, edad) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, edad || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nombre, email, edad });
  });
});

// PUT: Actualizar un usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, edad } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, email = ?, edad = ? WHERE id = ?';
  db.query(query, [nombre, email, edad || null, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado', id });
  });
});

// DELETE: Eliminar un usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado', id });
  });
});

module.exports = router;