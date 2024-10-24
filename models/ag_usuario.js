const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo de Usuario con sequelize
const cag_usuario = sequelize.define('ag_usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true, // Establecer "usuario" como la clave primaria
        unique: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: null
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        tableName: 'ag_usuario',
        timestamps: false, // Evitar timestamps automáticos
        id: false // Evitar la creación del campo `id` por defecto
    }
);

module.exports = cag_usuario;
