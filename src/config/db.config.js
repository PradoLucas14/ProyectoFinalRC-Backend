const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          // Otras opciones según sea necesario
        });
        console.log("Conexión a MongoDB establecida correctamente");
      } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Detiene el proceso de Node.js si hay un error de conexión
      }
    }

module.exports = connectDB;
