const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

const ExerciseLocal = connection.define('ExerciseLocal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  localidade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coordenadas: {
    type: DataTypes.STRING,
    allowNull: true
  },
  google_maps_link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'exercise_locals'
});

module.exports = ExerciseLocal;