'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Remove the old 'id' column
    await queryInterface.removeColumn('employers', 'id');

    // Step 2: Add a new integer-based 'id' as the FIRST column
    await queryInterface.sequelize.query(`
      ALTER TABLE employers
      ADD COLUMN id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: remove the integer id
    await queryInterface.removeColumn('employers', 'id');

    // Re-add the old char id at the end
    await queryInterface.addColumn('employers', 'id', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    });
  }
};
