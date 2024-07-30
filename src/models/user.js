const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

class User extends Model {
  static associate(models) {
    this.hasMany(models.ExerciseLocation, { foreignKey: 'userId', as: 'exerciseLocations' });
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: connection,
  modelName: 'User',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await User.hashPassword(user.password);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await User.hashPassword(user.password);
      }
    },
  },
});

module.exports = User;
