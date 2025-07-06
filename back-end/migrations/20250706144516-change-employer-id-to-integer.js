'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Drop the existing CHAR 'id' column
    await queryInterface.removeColumn('employers', 'id');

    // Step 2: Add a new INTEGER auto-increment 'id' column
    await queryInterface.addColumn('employers', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Optional: Revert back to CHAR if needed
    await queryInterface.removeColumn('employers', 'id');

    await queryInterface.addColumn('employers', 'id', {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    });
  }
};
