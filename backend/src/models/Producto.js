const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('vidrio', 'espejo', 'aluminio', 'herraje', 'insumo'),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    imagen_url: {
        type: DataTypes.STRING(255)
    },
    unidad_medida: {
        type: DataTypes.STRING(20)
    },
    precio_base: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock_minimo: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'productos',
    timestamps: false
});
module.exports = Producto;