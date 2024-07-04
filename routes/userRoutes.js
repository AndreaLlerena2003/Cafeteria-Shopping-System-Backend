const usuarioController = require('../controllers/usuarioController');
const verificarToken= require('../middleware/authMiddleware');

const router = require('express').Router()
router.post('/registrarUsuario',usuarioController.registrarUsuario)
router.get('/iniciarSesion',usuarioController.iniciarSesion)
router.get('/getDatosUsuario',verificarToken, usuarioController.getDatosUser)
router.post('/modificarDatosUsuario',verificarToken,usuarioController.modificarDatosUsuario)
router.post('/actualizarcontrasena',verificarToken,usuarioController.actualizarcontrasena)
router.get('/traerLongitudContrasena',verificarToken,usuarioController.traerLongitudContraseña)
router.post('/agregarTarjeta',verificarToken,usuarioController.agregarTarjeta)
router.get('/traerTarjetasUsuario',verificarToken,usuarioController.traerTarjetasUsuario)
router.get('/traerTrajetabyId',verificarToken,usuarioController.traerTrajetabyId)
router.post('/subir-foto',verificarToken,usuarioController.uploadPhoto)
router.get('/obtener-fotouser',verificarToken,usuarioController.getPhotoByUserToken)
module.exports = router