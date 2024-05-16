// todo lo del carrito
// + tarjetas
// metodo de pago
const db = require('../models');
const Orden = db.Orden;
const DetallesOrden = db.DetallesOrden;
const CarritoDetalles = db.CarritoDetalle;
const Carrito = db.Carrito;

const crearOrdenesDetalles = async (req, res) => {
    const { carritoId, metodoDePago, localId } = req.body; 
  
    try {
      if (!carritoId) {
        throw new Error('No se envió el carritoId');
      }
  
      let carrito = await Carrito.findByPk(carritoId);
      if (!carrito) {
        throw new Error('Carrito no encontrado');
      }
  
      const carritosDetalles = await CarritoDetalles.findAll({ where: { carritoId: carrito.id } });
  
      const orden = await Orden.create({
        userId: carrito.userId,
        FechaHora: new Date(),
        Estatus: 0,
        Total: 0.0,
        MetodoDePago: metodoDePago,
        localId: localId
      });
  
      for (let detalle of carritosDetalles) {
        await DetallesOrden.create({
          ordenId: orden.id,
          productoId: detalle.productoId,
          cantidad: detalle.cantidad,
          precio: detalle.precio
        });
      }
  
      const ordenDetalles = await DetallesOrden.findAll({ where: { ordenId: orden.id } });
      let totalOrden = 0;
      ordenDetalles.forEach(detalle => {
        totalOrden += detalle.precio * detalle.cantidad; 
      });
  
      await orden.update({ Total: totalOrden });

  
      res.status(201).json(orden);
    } catch (error) {
      console.error('Error al crear orden y detalles de la orden:', error);
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = crearOrdenesDetalles;