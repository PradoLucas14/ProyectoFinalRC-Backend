
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const reservationRoutes = require('./routes/reservationRoutes');
const cors = require('cors'); // Importar CORS
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB();

// Configurar CORS para todas las rutas
app.use(cors());

// Rutas
app.use('/', reservationRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
