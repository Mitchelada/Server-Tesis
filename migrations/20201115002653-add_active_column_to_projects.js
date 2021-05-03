'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn( 
      'projects',
      'active',
      {
        type: Sequelize.BOOLEAN,
        default: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'projects',
      'active',
    )
  }
};
