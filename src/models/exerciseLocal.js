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
  latitude: {
    type: DataTypes.FLOAT, 
    allowNull: true
  },
  longitude: {
    type: DataTypes.FLOAT, 
    allowNull: true
  },
  google_maps_link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'exercise_locals'
});

module.exports = ExerciseLocal;
