const db = require('../models');
const Local = db.Local;

const crearLocal = async (req, res) => {
    try {
      const { Nombre, Latitud, Longitud, Horario , Direccion} = req.body;
  
  
      const nuevoLocal = await Local.create({
        Nombre: Nombre,
        Latitud: Latitud,
        Longitud: Longitud,
        Horario: Horario,
        Direccion: Direccion
      });
  
     
      res.status(201).json(nuevoLocal);
    } catch (error) {
     
      console.error('Error al crear un nuevo local:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };


const obtenerTodosLosLocales = async (req, res) => {
    try {
        const locales = await Local.findAll();
        res.status(200).json(locales);
    } catch (error) {
        console.error('Error al obtener los locales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const obtenerLocalPorId = async (req, res) => {
    const { id } = req.query;
    try {
        const local = await Local.findByPk(id);
        if (!local) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }
        res.status(200).json(local);
    } catch (error) {
        console.error('Error al obtener el local:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = {
    crearLocal,
    obtenerTodosLosLocales,
    obtenerLocalPorId
};



