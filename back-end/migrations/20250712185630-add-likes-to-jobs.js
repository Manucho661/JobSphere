'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.addColumn('Jobs', 'likes', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'salary', // 👈 Place it after 'salary'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Jobs', 'likes');
  }
};
