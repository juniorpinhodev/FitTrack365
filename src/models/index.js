const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = require('./users');
const ExerciseLocal = require('./exerciseLocal');
const UserExerciseLocal = require('./userExerciseLocal');

// Definir associações
User.belongsToMany(ExerciseLocal, {
  through: 'UserExerciseLocal',
  foreignKey: 'userId',
  otherKey: 'exerciseLocalId'
});

ExerciseLocal.belongsToMany(User, {
  through: 'UserExerciseLocal',
  foreignKey: 'exerciseLocalId',
  otherKey: 'userId'
});

module.exports = {
  User,
  ExerciseLocal,
  UserExerciseLocal,
  connection
};
