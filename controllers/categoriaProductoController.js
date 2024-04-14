const db = require('../models');


const CategoriaProducto =  db.CategoriaProducto;

// Crear Categoria Producto
const crearCategoriaProducto = async(req,res) => {
    try{
        const {Nombre, Descripcion} = req.body;
        const nuevaCategoria = await CategoriaProducto.create({ Nombre, Descripcion });
        res.status(201).json(nuevaCategoria);
    } catch(error){
        console.error('Error al crear la categoría:', error);
        res.status(500).send('Error al crear la categoría del producto');
    }
}; 

// Obtener todas las Categorías de Producto --- para que veas Incio que toy comentando como quieres payaso
const obtenerCategoriasProducto = async(req,res) => {
    try{
        const categorias = await CategoriaProducto.findAll();
        res.status(200).json(categorias);

    }catch(error){
        console.error('Error al obtener las categorías:', error);
        res.status(500).send('Error al obtener las categorías de producto');
    }
};

// Obtener una Categoria Producto x ID
const obtenerCategoriaProductoxID = async(req,res) => {
    try{
        const id = parseInt(req.query.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }
        const categoria = await CategoriaProducto.findByPk(id);
        if (!categoria) {
            return res.status(404).send('Categoría no encontrada');
        }
        res.status(200).json(categoria);
        
    }catch(error){
        console.error('Error al obtener la categoría:', error)
        res.status(500).send('Error al obtener la categoría');
    }
};

module.exports = {
    crearCategoriaProducto,
    obtenerCategoriasProducto ,
    obtenerCategoriaProductoxID
}; 
