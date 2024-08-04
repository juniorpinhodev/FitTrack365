const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

const UserExerciseLocal = connection.define('UserExerciseLocal', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    exerciseLocalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'exercise_locals',
            key: 'id'
        }
    }
}, {
    tableName: 'user_exercise_locals'
});

module.exports = UserExerciseLocal;