// todo lo del carrito
// + tarjetas
// metodo de pago
const db = require('../models');
const Orden = db.Orden;
const DetallesOrden = db.DetallesOrden;
const CarritoDetalles = db.CarritoDetalle;
const Carrito = db.Carrito;
const Local = db.Local;
const Tarjeta = db.Tarjeta;

const crearOrdenesDetalles = async (req, res) => {
    const { metodoDePago, localId, tarjetaId } = req.body;
    const userId = req.userId;
    if (!userId) {
        return res.status(400).send('Identificador de usuario no proporcionado');
    }
  
    try {
        const carrito = await Carrito.findOne({ where: { userId: userId } });
  
        if (!carrito) {
            return res.status(404).send('Carrito no encontrado');
        }
  
        const carritosDetalles = await CarritoDetalles.findAll({ where: { carritoId: carrito.id } });
  
        if (carritosDetalles.length === 0) {
            return res.status(400).send('El carrito está vacío');
        }
  
        const orden = await Orden.create({
            userId: carrito.userId,
            FechaHora: new Date(),
            Estatus: 0, // Aún no la recoge uwu
            Total: 0.0,
            MedioDePago: metodoDePago,
            localId: localId
        });
  
        for (let detalle of carritosDetalles) {
            await DetallesOrden.create({
                ordenId: orden.id,
                productoId: detalle.productoId,
                Cantidad: detalle.Cantidad,
                Precio: detalle.Precio
            });
        }
  
        let totalOrden = carritosDetalles.reduce((total, detalle) => total + (detalle.Precio * detalle.Cantidad), 0);
        console.log(totalOrden);
  
        const local = await Local.findByPk(localId);
        if (!local) {
            return res.status(400).json({ error: 'Local no encontrado' });
        }
  
        // verificamos si el metodo de pago es con tarjeta
        if (metodoDePago === 1) {
            const tarjeta = await Tarjeta.findByPk(tarjetaId);
            if (!tarjeta) {
                return res.status(400).json({ error: 'Tarjeta no encontrada' });
            }
        }
  
        console.log(totalOrden);
        await orden.update({ Total: totalOrden });
  
        await CarritoDetalles.destroy({ where: { carritoId: carrito.id } });
        console.log('Se eliminaron las entradas del carrito correctamente.');
  
        res.status(201).json({ orden, ordenDetalles: carritosDetalles, local });
    } catch (error) {
        console.error('Error al crear orden y detalles de la orden:', error);
        res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
    crearOrdenesDetalles
  };
