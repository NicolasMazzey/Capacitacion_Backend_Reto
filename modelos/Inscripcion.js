const { DataTypes } = require('sequelize');
const sequelize = require('../servicios/sql');
const Usuario = require('./usuario');
const Asignatura = require('./asignatura');

const Inscripcion = sequelize.define('Inscripcion', {
  
});

// Relaciones
Usuario.belongsToMany(Asignatura, { through: Inscripcion });
Asignatura.belongsToMany(Usuario, { through: Inscripcion });

module.exports = Inscripcion;