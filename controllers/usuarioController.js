const db = require('../models');
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');  
const bcrypt = require('bcrypt'); 
dotenv.config();

const Usuario = db.Usuario;
const Tarjeta = db.Tarjeta;

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
    if (!req.body.nombre || !req.body.apellido || !req.body.emailAddress || !req.body.contraseña) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const errores = validaciones 
        .filter(v => v.validar(req.body.contraseña))
        .map(v => v.mensaje);

    if (errores.length > 0) {
        return res.status(400).send(errores.join('. '));
    }
    

    try {
        // Hashear la contraseña antes de almacenarla en la base de datos :) 
        const hashedContraseña = await bcrypt.hash(req.body.contraseña, 10);

        const maxIdResult = await Usuario.max("id");
        const nextIdUser = (maxIdResult || 0) + 1;

        const info = {
            id: nextIdUser,
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
    if (!req.query.emailAddress || !req.query.contraseña) {
        return res.status(400).send('Necesario Ingresar Email y Contraseña');
    }
    try {
        const usuario = await Usuario.findOne({
            attributes: ['id', 'contraseña'], 
            where: {
                emailAddress: req.query.emailAddress,
            },
        });
        if (!usuario) {
            return res.status(401).send('Email o contraseñas incorrectos');
        }
        // comparar la contraseña ingresada con la almacenada en la base de datos
        const contraseñaValida = await bcrypt.compare(req.query.contraseña, usuario.contraseña);
        //const contraseñaValida = req.query.contraseña;

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
            attributes: ['nombre', 'apellido', 'emailAddress','foto'],
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

// modificar datos
const modificarDatosUsuario = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).send('Identificador de usuario no proporcionado');
        }

        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        const camposParaActualizar = ['nombre', 'apellido', 'emailAddress'].reduce((acc, campo) => {
            if (req.body[campo]) acc[campo] = req.body[campo];
            return acc;
        }, {});
        // owo aqui con reduce verificamos los campos que el usuario realmente
        // quiere actualizar, y solo nos quedamos con esos campos para hacerle el update en el array camposParaActualizar
        // asi hacemos cod mas eficiente y no esta actualizando consas que se mantienen igual

        if (Object.keys(camposParaActualizar).length === 0) {
            return res.status(400).send('No hay cambios para actualizar');
        } // vemos q si la longitud de nuestro array de objetos campos para actualizar es igual a 0 entonces no se actualiza nada

        await usuario.update(camposParaActualizar); // se genere udpdate
        await usuario.reload();  // se recarga porsiaca
        res.json(usuario);
    } catch (error) {
        console.error('Error al modificar los datos del usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};

// cambiar contraseña
const actualizarcontrasena = async(req,res) => {
    try{
        const userId = req.userId;
        if (!userId) {
            return res.status(400).send('Identificador de usuario no proporcionado');
        }

        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        if (!req.query.contraseña){
            return res.status(404).send('No se ha encontrado contraseña para actualizar');
        }

        if(req.query.contraseña){
            const hashedContraseña = await bcrypt.hash(req.query.contraseña, 10);
            usuario.contraseña = hashedContraseña;
            const contraseñaActualizada = await usuario.save();
            res.json(contraseñaActualizada);
        }

    }catch(error){
        console.error('Error al cambiar los datos del usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

// tarer contraseña
const traerLongitudContraseña = async(req,res) => {
    try{
        const userId = req.userId;
        const usuario = await Usuario.findByPk(userId, {
            attributes: ['contraseña'],
        });
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        const longitudContraseña = usuario.contraseña.length;
        return res.status(200).json({ longitudContraseña });
    }catch (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
    }

}

// const subir foto

// agregar tarjeta
const agregarTarjeta = async(req,res) => {
    try{
        const userId = req.userId;
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        if (!req.body.NumeroTarjeta || !req.body.FechaVMes || !req.body.FechaVAño || !req.body.Codigo || !req.body.NombreTarjeta){
            return res.status(404).send('Faltan campos para poder agregar una tarjeta');
        }
        const { NumeroTarjeta, FechaVMes, FechaVAño, Codigo, NombreTarjeta} = req.body;

        const maxIdResult = await Tarjeta.max("id");
        const nextIdTarjeta = (maxIdResult || 0) + 1;

        const nuevaTarjeta = await Tarjeta.create({
            id: nextIdTarjeta,
            userId,
            NumeroTarjeta,
            FechaVMes,
            FechaVAño,
            Codigo,
            NombreTarjeta
        })
        return res.status(201).json({nuevaTarjeta});
    }catch(error){
        console.error('Error al agregar la tarjeta:', error);
        return res.status(500).send('Error interno del servidor');
    }

}

const traerTarjetasUsuario = async(req, res) => {
    try {
        const userId = req.userId; 
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        const tarjetas = await Tarjeta.findAll({
            where: { userId: userId },
            attributes: { exclude: [] } 
        });
        if (!tarjetas || tarjetas.length === 0) {
            return res.status(404).send('Tarjetas no encontradas');
        }

        res.status(200).json({ tarjetas });
    } catch (error) {
        console.error("Error al traer tarjetas", error);
        res.status(500).send('Error interno del servidor');
    }
}
const traerTrajetabyId = async(req,res) => {
    try {
        const userId = req.userId; 
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        if(!req.query.idTarjeta){
            return res.status(400).send('No se ha enviado ID de Tarjeta');
        }
        const id = req.query.idTarjeta

        const tarjeta = await Tarjeta.findOne({
            where: { userId: userId ,
                    id: id
            },
            attributes: { exclude: [] } 
        });
        if (!tarjeta) {
            return res.status(404).send('Tarjeta no encontrada');
        }
        
        res.status(200).json({ tarjeta });
    } catch (error) {
        console.error("Error al traer tarjeta", error);
        res.status(500).send('Error interno del servidor');
    }
}






module.exports = {
    registrarUsuario,
    iniciarSesion,
    getDatosUser,
    modificarDatosUsuario,
    actualizarcontrasena,
    traerLongitudContraseña,
    agregarTarjeta ,
    traerTarjetasUsuario, 
    traerTrajetabyId,

};
