const productoController = require('../controllers/productoController');

const router = require('express').Router()
router.post('/crearProducto',productoController.crearProductoConIngredientes)
router.get('/traerproductoID',productoController.traerproductoID)
router.get('/traerproductoConIngredientes',productoController.traerproductoConIngredientes)
router.get('/traerTodosLosProductos',productoController.traerTodosLosProductos)
router.get('/traerProductosPorCategoriaId',productoController.traerProductosPorCategoriaId)

module.exports = router