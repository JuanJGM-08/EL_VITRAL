const { Producto } = require('../models');

const productoController = {
    // Para listar los productos
    async listar(req, res) {
        try {
            const productos = await Producto.findAll({
                where: { activo: true },
                attributes: ['id', 'nombre', 'tipo', 'descripcion', 'imagen_url', 'unidad_medida', 'precio_base']
            });
            res.json(productos);
        } catch (error) {
            console.error('Error al listar productos:', error);
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id, {
                attributes: ['id', 'nombre', 'tipo', 'descripcion', 'imagen_url', 'unidad_medida', 'precio_base']
            });
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.json(producto);
        } catch (error) {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ error: 'Error al obtener producto' });
        }
    }
};

module.exports = productoController;