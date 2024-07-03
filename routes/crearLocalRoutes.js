const localController = require('../controllers/localController');
const router = require('express').Router()

router.post('/creaLocal',localController.crearLocal);
router.get('/traerTodosLosLocales',localController.obtenerTodosLosLocales);
router.get('/traerLocalPorId',localController.obtenerLocalPorId);
router.get('/listaLocales',localController.obtenerListaLocales);
module.exports = router

