const router = require('express').Router();

const controller= require('../controllers/productoController');

router.get('/productos/search', controller.obtenerProductos);
router.get('/productos', controller.getallProductos);
module.exports= router;