const router = require('express').Router();

const controller= require('../controllers/productoController');

router.get('/productos/search', controller.obtenerProductos);

module.exports= router;