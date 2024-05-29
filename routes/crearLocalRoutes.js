const localController = require('../controllers/localController');
const router = require('express').Router()

router.post('/creaLocal',localController.crearLocal);
router.get('/traerTodosLosLocales',localController.obtenerTodosLosLocales);
router.get('/traerLocalPorId',localController.obtenerLocalPorId);
module.exports = router

