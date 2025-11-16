
require('dotenv').config({ path: './.env' }); // Cargar variables de entorno

const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API REST con Node.js, Express y MySQL' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});