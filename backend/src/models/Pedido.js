const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cotizacion_id: {
        type: DataTypes.INTEGER
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_entrega: {
        type: DataTypes.DATE
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'en_proceso', 'listo', 'entregado'),
        defaultValue: 'pendiente'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2)
    },
    notas: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'pedidos',
    timestamps: false
}
);
module.exports = Pedido;