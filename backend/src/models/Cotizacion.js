const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cotizacion = sequelize.define('Cotizacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nombre_cliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email_cliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono_cliente: {
        type: DataTypes.STRING(20)
    },
    direccion_cliente: {
        type: DataTypes.TEXT
    },
    fecha_cotizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2)
    },
    iva: {
        type: DataTypes.DECIMAL(10, 2)
    },
    total: {
        type: DataTypes.DECIMAL(10, 2)
    },
    estado: {
        type: DataTypes.ENUM('vigente', 'aprobada', 'rechazada', 'convertida'),
        defaultValue: 'vigente'
    },
    codigo_unico: {
        type: DataTypes.STRING(50),
        unique: true
    }
}, {
    tableName: 'cotizaciones',
    timestamps: false
});
module.exports = Cotizacion;