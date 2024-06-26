const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para registrar un nuevo usuario
router.post('/usuarios/registrar', usuariosController.registrarUsuario);

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuariosController.obtenerUsuarios);

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', usuariosController.obtenerUsuarioPorId);

// Ruta para editar un usuario por su ID
router.patch('/usuarios/:id', usuariosController.editarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete('/usuarios/:id', usuariosController.eliminarUsuario);

module.exports = router;
