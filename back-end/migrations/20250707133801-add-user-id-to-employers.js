'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Employers', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'id', // <-- This places user_id right after 'id'
      references: {
        model: 'Users', // table name (case-sensitive depending on DB)
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Employers', 'user_id');
  }
};
