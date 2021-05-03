'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'requirements',
      'weight',
      {
        type: Sequelize.INTEGER,
        default: null
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'requirements',
      'weight'
    )
  }
};
