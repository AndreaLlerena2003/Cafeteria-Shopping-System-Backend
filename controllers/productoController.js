const db = require('../models');


const Producto =  db.Producto;
const Ingrediente =  db.Ingrediente;

const crearProductoConIngredientes = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { Nombre, Descripcion, Precio, Imagen, ingredientesIds } = req.body;
        
        // aqui tamos buscando q los ingredientes que se manden realmente existan
        const ingredientesExistentes = await Promise.all(
            ingredientesIds.map(id => Ingrediente.findByPk(id))
        );

        // si mandan un null no exites pes -.-
        if (ingredientesExistentes.includes(null)) {
            await t.rollback();
            return res.status(400).send('Uno o más ingredientes no existen.');
        }

        // se crea producto jijiji deberia comer
        const nuevoProducto = await Producto.create({ 
            Nombre, 
            Descripcion, 
            Precio, 
            Imagen 
        }, { transaction: t });

        // se asocia los ingreientes al producto
        await nuevoProducto.setIngredientes(ingredientesIds, { transaction: t });

        await t.commit(); // confirmamos la transaccion

        // obtenemos producto recien creado
        const productoConIngredientes = await Producto.findByPk(nuevoProducto.id, {
            include: Ingrediente,
        });

        res.status(201).json(productoConIngredientes);
    } catch (error) {
        if (!t.finished) {
            await t.rollback();
        } // caso haya error se revierte todo
        console.error('Error al crear producto con ingredientes:', error);
        res.status(500).send('Error al crear el producto con ingredientes');
    }
};


module.exports = {
    crearProductoConIngredientes
};