const ordenController = require('../controllers/ordenController');
const router = require('express').Router()
const verificarToken= require('../middleware/authMiddleware');

router.post('/crearOrden',verificarToken,ordenController.crearOrdenesDetalles);
router.get('/obtenerOrdenPorId',ordenController.obtenerOrdenPorId);
router.get('/obtenerOrdenesPorUsuario',verificarToken,ordenController.obtenerOrdenesPorUsuario);
router.patch('/actualizarEstatusOrden',ordenController.actualizarEstatusOrden);

module.exports = router
//1