
const express = require('express');
const app = express();  
const router = express.Router();  

app.use(express.json());


const carritoController = require('../controllers/carritoController');
const carritoDetalleController = require('../controllers/carritoDetalleController');
const verificarToken = require('../middleware/authMiddleware');


router.post('/agregarACarrito', verificarToken, carritoDetalleController.crearCarritoDetalle);
router.delete('/eliminarDetalleCarrito',carritoDetalleController.eliminarCarritoDetalle);
router.patch('/modificarDetalleCarritoMas',carritoDetalleController.modificarCarritoDetalleMas);
router.patch('/modificarDetalleCarritoMenos',carritoDetalleController.modificarCarritoDetalleMenos);
router.patch('/modificarTamano',carritoDetalleController.modificarCarritoDetalleTamaño);
router.get('/obtenerCarritoConTodosLosDatos',verificarToken,carritoController.ObtenerDetallesCarrito);


module.exports = router;
