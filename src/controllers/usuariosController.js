// Simulación de base de datos de usuarios
let usuarios = [];

// Controlador para registrar un nuevo usuario
function registrarUsuario(req, res) {
    const { nombre, email, contraseña, estadoCuenta, rol } = req.body;

    // Validación básica
    if (!nombre || !email || !contraseña || !estadoCuenta || !rol) {
        return res.status(400).json({ mensaje: 'Por favor, proporciona nombre, email, contraseña, estado de cuenta y rol' });
    }

    // Validación de estado de cuenta
    if (estadoCuenta !== 'activo' && estadoCuenta !== 'desactivado') {
        return res.status(400).json({ mensaje: 'El estado de cuenta debe ser "activo" o "desactivado"' });
    }

    // Validación de rol
    if (rol !== 'cliente' && rol !== 'administrador') {
        return res.status(400).json({ mensaje: 'El rol debe ser "cliente" o "administrador"' });
    }

    // Verificar si el email ya está en uso
    const existeUsuario = usuarios.find(u => u.email === email);
    if (existeUsuario) {
        return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    // Simulación de almacenamiento en base de datos
    const nuevoUsuario = { 
        id: usuarios.length + 1, 
        nombre, 
        email, 
        contraseña, 
        estadoCuenta, 
        rol 
    };
    usuarios.push(nuevoUsuario);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
}

// Controlador para obtener todos los usuarios
function obtenerUsuarios(req, res) {
    res.json({ usuarios });
}

// Controlador para obtener un usuario por su ID
function obtenerUsuarioPorId(req, res) {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ usuario });
}

// Controlador para editar un usuario por su ID
function editarUsuario(req, res) {
    const id = parseInt(req.params.id);
    const { nombre, email, estadoCuenta, rol } = req.body;

    // Validación básica
    if (!nombre && !email && !estadoCuenta && !rol) {
        return res.status(400).json({ mensaje: 'Por favor, proporciona al menos nombre, email, estado de cuenta o rol para actualizar' });
    }

    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar usuario
    if (nombre) {
        usuarios[usuarioIndex].nombre = nombre;
    }
    if (email) {
        usuarios[usuarioIndex].email = email;
    }
    if (estadoCuenta) {
        usuarios[usuarioIndex].estadoCuenta = estadoCuenta;
    }
    if (rol) {
        usuarios[usuarioIndex].rol = rol;
    }

    res.json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarios[usuarioIndex] });
}

// Controlador para eliminar un usuario por su ID
function eliminarUsuario(req, res) {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Eliminar usuario de la lista
    usuarios.splice(usuarioIndex, 1);

    res.json({ mensaje: 'Usuario eliminado correctamente' });
}

module.exports = {
    registrarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    editarUsuario,
    eliminarUsuario,
};
