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
const Producto = db.Producto;
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
        
        const maxIdResult = await Orden.max("id");
        const nextIdOrden = (maxIdResult || 0) + 1;

        const orden = await Orden.create({
            id: nextIdOrden,
            userId: carrito.userId,
            FechaHora: new Date(),
            Estatus: 0, 
            Total: 0.0,
            MedioDePago: metodoDePago,
            localId: localId
        });
        const detallesOrdenes = [];
        for (let detalle of carritosDetalles) {
            const producto = await Producto.findByPk(detalle.productoId);

            const nuevoDetalle = await DetallesOrden.create({
                ordenId: orden.id,
                productoId: detalle.productoId,
                Cantidad: detalle.Cantidad,
                Precio: detalle.Precio,
                Tamaño: detalle.Tamaño
            });

            detallesOrdenes.push({
                DetallesOrden: nuevoDetalle,
                Producto: producto 
            }); 
        }
        let totalOrden = 0;
        totalOrden = carritosDetalles.reduce((total, detalle) => total + (detalle.Precio*detalle.Cantidad), 0);
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
            await orden.update({tarjetaId: tarjetaId})
        }
        else{
            await orden.update({tarjetaId: null})
        }
  
        console.log(totalOrden);
        await orden.update({ Total: totalOrden });
  
        await CarritoDetalles.destroy({ where: { carritoId: carrito.id } });
        console.log('Se eliminaron las entradas del carrito correctamente.');
  
        res.status(201).json({ orden });
    } catch (error) {
        console.error('Error al crear orden y detalles de la orden:', error);
        res.status(500).json({ message: error.message });
    }
  };

 
const obtenerOrdenPorId = async (req, res) => {
    const { ordenId } = req.query;

    try {
        const orden = await Orden.findByPk(ordenId, {
            include: [
                { model: DetallesOrden, as: 'detallesorden', include: [{ model: Producto, as: 'producto' }]  }, 
                { model: Local, as: 'local' } 
            ]
        });

        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.status(200).json(orden);
    } catch (error) {
        console.error('Error al obtener orden por ID:', error);
        res.status(500).json({ message: error.message });
    }
};


const obtenerOrdenesPorUsuario = async (req, res) => {
    const userId = req.userId;

    try {
        const ordenes = await Orden.findAll({
            where: { userId: userId },
            include: [
                { model: DetallesOrden, as: 'detallesorden' },
                { model: Local, as: 'local' }
            ]
        });

        if (ordenes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron órdenes para el usuario' });
        }

        res.status(200).json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes por usuario:', error);
        res.status(500).json({ message: error.message });
    }
};

const obtenerOrdenActiva = async (req, res) => {
    const userId = req.userId;

    try {
        const orden = await Orden.findOne({
            where: { 
                userId: userId,
                Estatus: 0
            },
            attributes: ["id"]
        });

        if (!orden) {
            return res.status(404).json(null);
        }

        res.status(200).json(orden);
    } catch (error) {
        console.error('Error al obtener orden del usuario:', error);
        res.status(500).json({ message: error.message });
    }
}

const actualizarEstatusOrden = async (req, res) => {
    const {ordenId} = req.query;

    try {
        const orden = await Orden.findByPk(ordenId);

        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await orden.update({ Estatus: 1 });

        res.status(200).json({ message: 'Estatus de la orden actualizado correctamente', orden });
    } catch (error) {
        console.error('Error al actualizar el estatus de la orden:', error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    crearOrdenesDetalles,
    obtenerOrdenPorId ,
    obtenerOrdenesPorUsuario,
    actualizarEstatusOrden,
   obtenerOrdenActiva
  };

