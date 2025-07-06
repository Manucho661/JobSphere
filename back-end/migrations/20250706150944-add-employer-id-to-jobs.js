'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('jobs', 'employer_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'employers', // name of the referenced table
        key: 'id',          // key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      after: 'id', // place it right after `id`
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('jobs', 'employer_id');
  }
};
