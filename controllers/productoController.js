const db = require('../models');


const Producto =  db.Producto;
const Ingrediente =  db.Ingrediente;
const CategoriaProducto = db.CategoriaProducto;

const crearProductoConIngredientes = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { Nombre, Descripcion, Precio, Imagen, ingredientesIds, categoriaId } = req.body;
        
        // aqui tamos buscando q los ingredientes que se manden realmente existan
        const ingredientesExistentes = await Promise.all(
            ingredientesIds.map(id => Ingrediente.findByPk(id))
        );

        // si mandan un null no exites pes -.-
        if (ingredientesExistentes.includes(null)) {
            await t.rollback();
            return res.status(400).send('Uno o más ingredientes no existen.');
        }
        const categoriaExistente = await CategoriaProducto.findByPk(categoriaId);
        if (!categoriaExistente) {
            await t.rollback();
            return res.status(400).send('El ID de la categoría del producto no existe');
        }
         console.log('Categoría encontrada:', categoriaExistente);

        // se crea producto jijiji deberia comer
        const nuevoProducto = await Producto.create({ 
            Nombre, 
            Descripcion, 
            Precio, 
            Imagen,
            categoriaId
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

const traerproductoID = async (req,res) => {
    try {
        const id = parseInt(req.query.id,10);
        if (isNaN(id)) {
            return res.status(400).send("Id invalido");
        }
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).send('Producto No Encontrado');
        }
        res.status(200).json(producto);
    }catch(error){
        console.error("Error al traer el producto",error)
        res.status(500).send('Error al traer el producto');
    }
};

const traerproductoConIngredientes = async(req,res) => {
    try{
        const id = parseInt(req.query.id,10);
        if (isNaN(id)) {
            return res.status(400).send("Id invalido");
        }
        const producto = await Producto.findByPk(id,{
            include: [{
                model: Ingrediente,
                through: { attributes: [] }
            }]
        });

        if(!producto){
            return res.status(404).send('Producto No Encontrado');
        }

        res.status(200).json({producto});

    }catch(error){
        console.error("Error al traer el producto",error)
        res.status(500).send('Error al crear el producto con ingredientes');

    }
}

const traerTodosLosProductos = async(req,res) => {
    try{
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    }catch(error){
        console.error('Error al obtener todos los productos:', err)
    }
};

// traer productos por categoria

const traerProductosPorCategoriaId = async(req, res) => {
    try{
        const id = parseInt(req.query.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }
        const productos = await Producto.findAll({
            include:[{
                model: CategoriaProducto,
                where: { id: id}
            }]
        });
        if (!productos.length) {
            return res.status(404).send('No se encontraron productos para la categoria especificada');
        }
        res.json(productos);

    }catch(error){
        console.error('Error al prodcutos por categoria:', error);
        res.status(500).send('Error interno del servidor');
    }
}

module.exports = {
    crearProductoConIngredientes,
    traerproductoID,
    traerproductoConIngredientes,
    traerTodosLosProductos,
    traerProductosPorCategoriaId
};
