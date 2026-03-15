const router = require('express').Router();
const cotizacionController = require('../controllers/cotizacionController');

router.post('/', cotizacionController.crear);
router.get('/:codigo', cotizacionController.obtenerPorCodigo);

module.exports = router;