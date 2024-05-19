const localController = require('../controllers/localController');
const router = require('express').Router()

router.post('/creaLocal',localController.crearLocal);
module.exports = router

