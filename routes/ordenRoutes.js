const ordenController = require('../controllers/ordenController');
const router = require('express').Router()
const verificarToken= require('../middleware/authMiddleware');

router.post('/crearOrden',verificarToken,ordenController.crearOrdenesDetalles);
module.exports = router
//1