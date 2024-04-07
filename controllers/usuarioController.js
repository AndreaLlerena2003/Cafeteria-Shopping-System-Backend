const db = require('../models');
const jwt = require('jsonwebtoken'); // Generar y verificar tokens JWT
const dotenv = require('dotenv');  // Cargar Variables de Entorno
const bcrypt = require('bcrypt'); // Hashing para contraseñas en la BD
dotenv.config();

const Usuario = db.Usuario;
// Constante de valiadaciones necesarias para crear usuario
const validaciones = [
    {
        validar: (contraseña) => contraseña.length < 5,
        mensaje: 'La contraseña debe tener al menos 5 caracteres'
    },
    {
        validar: (contraseña) => contraseña.length > 20,
        mensaje: 'La contraseña no debe exceder los 20 caracteres'
    },
    {
        validar: (contraseña) => !/\d/.test(contraseña),
        mensaje: 'La contraseña debe incluir al menos un número'
    },
    {
        validar: (contraseña) => !/[A-Z]/.test(contraseña),
        mensaje: 'La contraseña debe incluir al menos una letra mayúscula'
    },
    {
        validar: (contraseña) => !/[a-z]/.test(contraseña),
        mensaje: 'La contraseña debe incluir al menos una letra minúscula'
    },
    {
        validar: (contraseña) => !/[!@#\$%\^&]/.test(contraseña),
        mensaje: 'La contraseña debe incluir al menos un caracter especial (!, @, #, etc.)'
    }
];

const registrarUsuario = async (req, res) => {
    if (!req.body.nombreUsuario || !req.body.nombre || !req.body.apellido || !req.body.emailAddress || !req.body.contraseña) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const errores = validaciones // Ejecucion de Validaciones
        .filter(v => v.validar(req.body.contraseña))
        .map(v => v.mensaje);

    if (errores.length > 0) {
        return res.status(400).send(errores.join('. '));
    }

    try {
        // Hashear la contraseña antes de almacenarla en la base de datos :) 
        const hashedContraseña = await bcrypt.hash(req.body.contraseña, 10);

        const info = {
            nombreUsuario: req.body.nombreUsuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            emailAddress: req.body.emailAddress,
            contraseña: hashedContraseña, 
        };

        const usuario = await Usuario.create(info);
        res.status(200).send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el Usuario');
    }
};

const iniciarSesion = async (req, res) => {
    if (!req.query.nombreUsuario || !req.query.contraseña) {
        return res.status(400).send('Necesario Ingresar Nombre y Contraseña');
    }
    try {
        const usuario = await Usuario.findOne({
            attributes: ['id', 'contraseña'], // Obtener la contraseña almacenada
            where: {
                nombreUsuario: req.query.nombreUsuario,
            },
        });
        if (!usuario) {
            return res.status(401).send('Nombre de usuario o contraseñas incorrectos');
        }
        // comparar la contraseña ingresada con la almacenada en la base de datos
        const contraseñaValida = await bcrypt.compare(req.query.contraseña, usuario.contraseña);

        if (contraseñaValida) {
            // generar token con la clave secreta de la variable de entorno
            const token = jwt.sign({ userId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '4h' });
            res.header('Authorization', `Bearer ${token}`);
            return res.status(200).json({ token: token, message: 'Inicio de sesión exitoso' });
        } else {
            return res.status(401).send('Nombre de usuario o contraseñas incorrectos');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
    }
};

const getDatosUser = async (req, res) => {

    try{
        const userId = req.userId;
        const usuario = await Usuario.findByPk(userId, {
            attributes: ['nombreUsuario', 'nombre', 'apellido', 'emailAddress','foto'],
        });
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        return res.status(200).json(usuario);
    }catch (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
    }
}

// const subir foto

module.exports = {
    registrarUsuario,
    iniciarSesion,
    getDatosUser
};
