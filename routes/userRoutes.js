const usuarioController = require('../controllers/usuarioController');
const verificarToken= require('../middleware/authMiddleware');

const router = require('express').Router()
router.post('/registrarUsuario',usuarioController.registrarUsuario)
router.get('/iniciarSesion',usuarioController.iniciarSesion)
router.get('/getDatosUsuario',verificarToken, usuarioController.getDatosUser)


module.exports = router