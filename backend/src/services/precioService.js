const { Producto } = require('../models');

class PrecioService {
    async calcularPrecio(producto, datos) {
        let precioBase = parseFloat(producto.precio_base);
        let factor = 1;
        //Dispuesto a cambiar, hay que implementar todos los precios especificos para cada tipo de espejo o vidrio y su grosor.
        //Estos precios son solo simulacion y no son reales, bueno esto lo deberia poner el de frontend y no yo, aca nadie lo leera jeje
        switch (producto.tipo) {
            case 'vidrio':
            case 'espejo':
                if (datos.medida_largo && datos.medida_ancho) {
                    const area = (datos.medida_largo * datos.medida_ancho) / 10000; 
                    factor = area;
                }
                if (datos.grosor) {
                    factor *= (datos.grosor / 4); 
                }
                break;
            case 'aluminio':
                if (datos.medida_largo) {
                    factor = datos.medida_largo / 100;
                }
                break;
            default:
                factor = 1;
        }

        return precioBase * factor * (datos.cantidad || 1);
    }

    async calcularTotal(productos) {
        let subtotal = 0;
        for (const item of productos) {
            const producto = await Producto.findByPk(item.producto_id);
            if (producto) {
                subtotal += await this.calcularPrecio(producto, item);
            }
        }
        const iva = subtotal * 0.19;
        return {
            subtotal: subtotal.toFixed(2),
            iva: iva.toFixed(2),
            total: (subtotal + iva).toFixed(2)
        };
    }
}

module.exports = new PrecioService();