const { DataTypes } = require('sequelize');
const sequelize = require('../servicios/sql');

const Asignatura = sequelize.define('Asignatura', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
});

module.exports = Asignatura;