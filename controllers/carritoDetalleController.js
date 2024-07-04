const db = require('../models');
const Producto = db.Producto;
const CarritoDetalle = db.CarritoDetalle;
const Carrito = db.Carrito;
const crearCarritoController = require('./carritoController');

const crearCarritoDetalle = async (req, res) => {
    const { productoId: initialProductoId, cantidad: initialCantidad, tamaño: initialTamaño } = req.body;
    try {
        userId = req.userId
        console.log(userId);  
        
        
        const carrito = await crearCarritoController.crearCarritoAndGetCarritoId(userId);
        if (!carrito) {
            return res.status(500).send("Carrito no creado");
        }
        const carritoId = carrito.id;

       
        const productoId = parseInt(initialProductoId, 10);
        if (isNaN(productoId)) {
            return res.status(400).send("Id producto inválido");
        }

       
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).send('Producto No Encontrado');
        }


        const cantidad = parseInt(initialCantidad, 10);
        if (isNaN(cantidad) || cantidad < 1) {
            return res.status(400).send("Cantidad inválida");
        }

      
        let precio = producto.Precio * cantidad;
        if (initialTamaño === 1) {
            precio += 3;
        } else if (initialTamaño === 2) {
            precio += 6;
        }

        const maxIdResult = await CarritoDetalle.max("id");
        const nextIdCarrito = (maxIdResult || 0) + 1;
    
        const nuevoCarritoDetalle = await CarritoDetalle.create({
            id: nextIdCarrito,
            productoId: productoId,
            Cantidad: cantidad,
            Precio: precio,
            carritoId: carritoId,
            Tamaño : initialTamaño
        });

       
        await crearCarritoController.recalculo_del_total(carritoId);

        res.status(201).json(nuevoCarritoDetalle);
    } catch (error) {
        console.error('Error al crear el detalle del carrito:', error);
        res.status(500).send('Error al crear el detalle del carrito');
    }
};

const eliminarCarritoDetalle = async (req, res) => {
    const {carritoDetalleId} = req.query;

    console.log(carritoDetalleId);  
        try {
            let carrito = await CarritoDetalle.findByPk(carritoDetalleId);
            if (carrito === null){
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }
            await carrito.destroy();
            await crearCarritoController.recalculo_del_total(carrito.carritoId);
            res.status(204).send(); 
        }catch (error) {
            console.error('Error al eliminar carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
 
};

const modificarCarritoDetalleMas = async(req,res) => {
    const {carritoDetalleId} = req.query;
    console.log(carritoDetalleId);  
        try {
            let carrito = await CarritoDetalle.findByPk(carritoDetalleId);
            if (!carrito){
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }
            carrito.Cantidad = carrito.Cantidad + 1;
            const producto = await carrito.getProducto();
            if(!producto){
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            console.log(carrito.Cantidad);
            console.log(producto.Precio);

            const precio = producto.Precio * carrito.Cantidad;
            carrito.Precio = precio;
            await carrito.save(); 
            await crearCarritoController.recalculo_del_total(carrito.carritoId);
            res.status(200).json(carrito);

        }catch (error) {
            console.error('Error al modificar carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

}

const modificarCarritoDetalleMenos = async(req,res) => {
    const {carritoDetalleId} = req.query;
    console.log(carritoDetalleId);  
        try {
            let carrito = await CarritoDetalle.findByPk(carritoDetalleId);
            if (!carrito){
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }
            carrito.Cantidad = carrito.Cantidad - 1;
            const producto = await carrito.getProducto();
            if(!producto){
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            console.log(carrito.Cantidad);
            console.log(producto.Precio);
            const precio = producto.Precio * carrito.Cantidad;
            carrito.Precio = precio;

            await carrito.save(); 
            await crearCarritoController.recalculo_del_total(carrito.carritoId);
            res.status(200).json(carrito);

        }catch (error) {
            console.error('Error al modificar carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

}

const modificarCarritoDetalleTamaño = async (req, res) => {
    const { carritoDetalleId, nuevoTamaño } = req.query; 

    try {
        let carrito = await CarritoDetalle.findByPk(carritoDetalleId);
        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        
        const producto = await carrito.getProducto();
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        let precio = producto.Precio * carrito.Cantidad;

        const tamaño = parseInt(nuevoTamaño, 10);
        if (tamaño === 1) {
            precio += 3;
        } else if (tamaño === 2) {
            precio += 6;
        } else if (tamaño !== 0) {
            return res.status(400).json({ error: 'Tamaño inválido' });
        }

        carrito.Precio = precio;
        carrito.Tamaño = tamaño;
        await carrito.save();
        await crearCarritoController.recalculo_del_total(carrito.carritoId);

        res.status(200).json(carrito);
    } catch (error) {
        console.error('Error al modificar tamaño del carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    crearCarritoDetalle,
    eliminarCarritoDetalle,
    modificarCarritoDetalleMas,
    modificarCarritoDetalleMenos,
    modificarCarritoDetalleTamaño
};



