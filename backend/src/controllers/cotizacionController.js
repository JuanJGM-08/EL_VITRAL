const { Cotizacion, CotizacionDetalle, Producto } = require('../models');
const precioService = require('../services/precioService');

const cotizacionController = {
    // Crear cotización publica sin autenticacion
    async crear(req, res) {
        try {
            const { cliente, productos } = req.body;

            const totales = await precioService.calcularTotal(productos);

            const codigo = `COT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            // Crear cotización
            const cotizacion = await Cotizacion.create({
                nombre_cliente: cliente.nombre,
                email_cliente: cliente.email,
                telefono_cliente: cliente.telefono,
                direccion_cliente: cliente.direccion,
                subtotal: totales.subtotal,
                iva: totales.iva,
                total: totales.total,
                codigo_unico: codigo
            });

            // Crear detalles
            for (const item of productos) {
                const producto = await Producto.findByPk(item.producto_id);
                const precioUnitario = await precioService.calcularPrecio(producto, item) / item.cantidad;
                await CotizacionDetalle.create({
                    cotizacion_id: cotizacion.id,
                    producto_id: item.producto_id,
                    descripcion: `${producto.nombre} ${item.medida_largo}x${item.medida_ancho}`,
                    cantidad: item.cantidad,
                    medida_largo: item.medida_largo,
                    medida_ancho: item.medida_ancho,
                    grosor: item.grosor,
                    precio_unitario: precioUnitario,
                    subtotal: precioUnitario * item.cantidad
                });
            }

            res.status(201).json({
                message: 'Cotización creada',
                codigo: codigo,
                total: totales.total
            });
        } catch (error) {
            console.error('Error al crear cotización:', error);
            res.status(500).json({ error: 'Error al crear cotización' });
        }
    },

    // Obtener cotización por id o codigo
    async obtenerPorCodigo(req, res) {
        try {
            const { codigo } = req.params;
            const cotizacion = await Cotizacion.findOne({
                where: { codigo_unico: codigo },
                include: [{
                    model: CotizacionDetalle,
                    include: [Producto]
                }]
            });
            if (!cotizacion) {
                return res.status(404).json({ error: 'Cotización no encontrada' });
            }
            res.json(cotizacion);
        } catch (error) {
            console.error('Error al obtener cotización:', error);
            res.status(500).json({ error: 'Error al obtener cotización' });
        }
    }
};
module.exports = cotizacionController;