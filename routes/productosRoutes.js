const productoController = require('../controllers/productoController');

const router = require('express').Router()
router.post('/crearProducto',productoController.crearProductoConIngredientes)

module.exports = router