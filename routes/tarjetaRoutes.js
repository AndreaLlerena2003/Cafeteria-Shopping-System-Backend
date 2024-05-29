const tarjetaController = require('../controllers/tarjetaController');
const router = require('express').Router();
const verificarToken= require('../middleware/authMiddleware');

router.post('/crearTarjeta',verificarToken,tarjetaController.validarTarjeta);
router.delete('/eliminarTarjeta',tarjetaController.eliminarTarjeta);
router.get('/traerNumeroTarjetaPorUsuario',verificarToken,tarjetaController.obtenerTarjetas);
router.get('/obtenerTarjetasUsuario',verificarToken,tarjetaController.obtenerTarjetas);
router.get('/obtenerTarjetaPorId',tarjetaController.obtenerTarjetaPorIdConAsteriscos);
module.exports = router