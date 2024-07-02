const ingredienteController = require('../controllers/ingredienteController');

const router = require('express').Router()
router.post('/crearIngrediente',ingredienteController.crearIngrediente)
router.get('/obtenerTodosLosIngredientes',ingredienteController.obtenerTodosLosIngredientes)
router.get('/obtenerIngrediente',ingredienteController.obtenerIngrediente)


module.exports = router