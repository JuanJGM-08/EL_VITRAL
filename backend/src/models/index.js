const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Cotizacion = require('./Cotizacion');
const CotizacionDetalle = require('./CotizacionDetalle');
const Pedido = require('./Pedido');

Usuario.hasMany(Cotizacion, { foreignKey: 'usuario_id' });
Cotizacion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Cotizacion.hasMany(CotizacionDetalle, { foreignKey: 'cotizacion_id' });
CotizacionDetalle.belongsTo(Cotizacion, { foreignKey: 'cotizacion_id' });

Producto.hasMany(CotizacionDetalle, { foreignKey: 'producto_id' });
CotizacionDetalle.belongsTo(Producto, { foreignKey: 'producto_id' });

Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Cotizacion.hasOne(Pedido, { foreignKey: 'cotizacion_id' });
Pedido.belongsTo(Cotizacion, { foreignKey: 'cotizacion_id' });

module.exports = {
    sequelize,
    Usuario,
    Producto,
    Cotizacion,
    CotizacionDetalle,
    Pedido
};