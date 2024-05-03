const db = require('../models');
const Carrito = db.Carrito;

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

// Exportar la función correctamente
module.exports = {
    crearCarritoAndGetCarritoId
};

// obtener todo el carrito con carrito detalle incluido