const tarjetaController = require('../controllers/tarjetaController');
const router = require('express').Router();
const verificarToken= require('../middleware/authMiddleware');

router.post('/crearTarjeta',verificarToken,tarjetaController.validarTarjeta);
router.delete('/eliminarTarjeta',tarjetaController.eliminarTarjeta);

module.exports = router