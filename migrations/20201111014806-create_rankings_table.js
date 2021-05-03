'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('Rankings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      score: {
        type: Sequelize.INTEGER
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      RequirementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: 'Requirements',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.createTable('Rankings')
  }
};
