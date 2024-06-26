const express = require('express');
const connectDB = require('./config/db.config');  // Importar configuración de base de datos
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Configuración de variables de entorno
dotenv.config();

// Iniciar aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas de usuarios
app.use('/api', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
