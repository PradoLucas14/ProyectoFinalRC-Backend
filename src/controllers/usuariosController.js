const Usuario = require('../models/Usuario');

// Controlador para registrar un nuevo usuario
async function registrarUsuario(req, res) {
    const { nombre, email, contraseña, estadoCuenta, rol } = req.body;

    try {
        // Verificar si el email ya está en uso
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
        }

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            contraseña,
            estadoCuenta,
            rol,
        });

        // Guardar usuario en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno al registrar usuario' });
    }
}

// Controlador para obtener todos los usuarios
async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.json({ usuarios });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ mensaje: 'Error interno al obtener usuarios' });
    }
}

// Controlador para obtener un usuario por su ID
async function obtenerUsuarioPorId(req, res) {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ usuario });
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ mensaje: 'Error interno al obtener usuario por ID' });
    }
}

// Controlador para editar un usuario por su ID
async function editarUsuario(req, res) {
    const id = req.params.id;
    const { nombre, email, estadoCuenta, rol } = req.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        if (nombre) usuario.nombre = nombre;
        if (email) usuario.email = email;
        if (estadoCuenta) usuario.estadoCuenta = estadoCuenta;
        if (rol) usuario.rol = rol;

        await usuario.save();

        res.json({ mensaje: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        console.error('Error al editar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno al editar usuario' });
    }
}

// Controlador para eliminar un usuario por su ID
async function eliminarUsuario(req, res) {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno al eliminar usuario' });
    }
}

module.exports = {
    registrarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    editarUsuario,
    eliminarUsuario,
};
