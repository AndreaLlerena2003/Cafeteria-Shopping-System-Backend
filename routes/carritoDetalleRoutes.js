
const express = require('express');
const app = express();  
const router = express.Router();  

app.use(express.json());


const carritoController = require('../controllers/carritoController');
const carritoDetalleController = require('../controllers/carritoDetalleController');
const verificarToken = require('../middleware/authMiddleware');


router.post('/agregarACarrito', verificarToken, carritoDetalleController.crearCarritoDetalle);
router.delete('/eliminarDetalleCarrito',carritoDetalleController.eliminarCarritoDetalle);
router.patch('/modificarDetalleCarritoCantidad',carritoDetalleController.modificarCarritoDetalle);
// modificar tamaño

module.exports = router;
