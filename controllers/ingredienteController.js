const db = require('../models');


const Ingrediente =  db.Ingrediente;


// Crear Ingrediente
const crearIngrediente = async(req,res) => {
    try{
        const {nombre} = req.body;
        const nuevoIngrediente = await Ingrediente.create({ Nombre: nombre });
        res.status(201).json(nuevoIngrediente);
    } catch(error){
        console.error('Error al crear ingrediente:', error);
        res.status(500).send('Error al crear el ingrediente');
    }
}; 

// Obtener todos los Ingredientes
const obtenerTodosLosIngredientes = async(req,res) => {
    try{
        const ingredientes = await Ingrediente.findAll();
        res.status(200).json(ingredientes)
    }catch(error){
        console.error('Error al obtener ingredientes:', error);
        res.status(500).send('Error al obtener los ingredientes');
    }

}
// Obtener un Ingrediente
const obtenerIngrediente = async(req, res) => {
    try {
        const id = parseInt(req.query.id, 10); // verificamos q es un numero -.- #inicio hate pendebis
        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }
        const ingrediente = await Ingrediente.findByPk(id);
        if (!ingrediente) {
            return res.status(404).send('Ingrediente no encontrado');
        }
        res.status(200).json(ingrediente);
    } catch (error) {
        console.error('Error al obtener ingrediente:', error);
        res.status(500).send('Error al obtener el ingrediente');
    }
};



module.exports = {
    crearIngrediente,
    obtenerTodosLosIngredientes,
    obtenerIngrediente
};
