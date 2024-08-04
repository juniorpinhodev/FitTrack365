'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('exercise_locals', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.addColumn('exercise_locals', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.removeColumn('exercise_locals', 'coordenadas');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('exercise_locals', 'coordenadas', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn('exercise_locals', 'latitude');
    await queryInterface.removeColumn('exercise_locals', 'longitude');
  }
};
