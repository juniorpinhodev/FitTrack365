const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require('bcryptjs');
const ExerciseLocal = require("./exerciseLocal");

const User = connection.define('users', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sexo: {
    type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

// Hooks
User.beforeSave((user) => {
  if (user.senha) {
    user.senha = hashSync(user.senha, 10);
  }
  return user;
});

// Associações
User.hasMany(ExerciseLocal, { foreignKey: 'userId', as: 'exerciseLocals' });

module.exports = User;
