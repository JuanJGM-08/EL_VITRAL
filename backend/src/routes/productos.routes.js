const router = require('express').Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.listar);
router.get('/:id', productoController.obtenerPorId);

module.exports = router;