const categoriaProductoController = require('../controllers/categoriaProductoController');

const router = require('express').Router()
router.post('/crearCategoriaProducto',categoriaProductoController.crearCategoriaProducto)
router.get('/obtenerCategoriasProducto',categoriaProductoController.obtenerCategoriasProducto)
router.get('/obtenerCategoriaProductoxID',categoriaProductoController.obtenerCategoriaProductoxID)


module.exports = router