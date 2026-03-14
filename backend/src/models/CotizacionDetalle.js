const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CotizacionDetalle = sequelize.define('CotizacionDetalle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cotizacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255)
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    medida_largo: {
        type: DataTypes.DECIMAL(10, 2)
    },
    medida_ancho: {
        type: DataTypes.DECIMAL(10, 2)
    },
    grosor: {
        type: DataTypes.INTEGER
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2)
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    tableName: 'cotizacion_detalles',
    timestamps: false
});
module.exports = CotizacionDetalle;