const { where } = require('sequelize');
const db = require('../models');
const Carrito = db.Carrito;
const Usuario = db.Usuario;

const crearCarritoAndGetCarritoId = async (userId) => {
    userId = userId;
    
    try {
        let carrito = await Carrito.findOne({
            where: {
                userId: userId
            }
        });

        if (!carrito) {
            carrito = await Carrito.create({
                userId: userId
            });
        }

        return carrito;
    } catch (error) {
        console.error('Error al crear o buscar el carrito:', error);
        throw error;
    }
};

// obtener todo el carrito con carrito detalle incluido
const ObtenerDetallesCarrito = async (req, res) => {
    const userId = req.userId;

    try {
        if (!userId) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

       
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

    
        const carrito = await Carrito.findOne({ where: { userId: userId } });
        if (!carrito) {
            return res.status(400).send('El carrito no ha sido creado');
        }

       
        const carritosDetalles = await CarritoDetalles.findAll({ where: { carritoId: carrito.id } });

       
        let totalCarrito = 0;
        carritosDetalles.forEach(detalle => {
            totalCarrito += detalle.Precio;
        });

   
        carrito.Total = totalCarrito;
        await carrito.save();

      
        const infoCarrito = {
            carritoId: carrito.id,
            carritosDetalles: carritosDetalles,
            Total: carrito.Total
        };

        
        res.status(200).send(infoCarrito);
    } catch (error) {
        console.error('Error al obtener detalles del carrito:', error);
        res.status(500).send('Error al obtener detalles del carrito');
    }
};


module.exports = {
    crearCarritoAndGetCarritoId,
    ObtenerDetallesCarrito
};
