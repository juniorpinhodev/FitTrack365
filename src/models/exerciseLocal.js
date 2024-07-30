const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const User = require("./users");

const ExerciseLocal = connection.define('exerciseLocals', {
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
    type: DataTypes.STRING ,
    allowNull: true
  },
  google_maps_link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true, // Adiciona os campos createdAt e updatedAt
});

// Associação com o modelo User
ExerciseLocal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = ExerciseLocal;
