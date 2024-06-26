const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Rutas de usuarios
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
