"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    const now = new Date();

    users.push({
      username: "admin_user",
      email: "admin@example.com",
      role: "admin",
      password: "adminpassword",
      createdAt: now,
      updatedAt: now,
    });

    for (let i = 1; i < 20; i++) {
      users.push({
        username: `employer${i}`,
        email: `employer${i}@example.com`,
        role: "employer",
        password: `password${i}`,
        createdAt: now,
        updatedAt: now,
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
