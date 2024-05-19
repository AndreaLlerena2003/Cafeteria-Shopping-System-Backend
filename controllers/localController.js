const db = require('../models');
const Local = db.Local;

const crearLocal = async (req, res) => {
    try {
      const { Nombre, Latitud, Longitud, Horario } = req.body;
  
  
      const nuevoLocal = await Local.create({
        Nombre: Nombre,
        Latitud: Latitud,
        Longitud: Longitud,
        Horario: Horario
      });
  
     
      res.status(201).json(nuevoLocal);
    } catch (error) {
     
      console.error('Error al crear un nuevo local:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

module.exports = {
    crearLocal
};



