const { DataTypes } = require('sequelize');

const sequelize = require('../servicios/sql');

const Usuario = sequelize.define('Usuario', {
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario'),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;