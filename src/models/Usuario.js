const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    estadoCuenta: { type: String, enum: ['activo', 'desactivado'], required: true },
    rol: { type: String, enum: ['cliente', 'administrador'], required: true },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
