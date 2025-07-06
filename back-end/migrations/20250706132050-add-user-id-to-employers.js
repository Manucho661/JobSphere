"use strict";

const bcrypt = require("bcryptjs"); // Optional, if you're hashing passwords

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("defaultPass123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        id: 4,
        username: "employer4",
        email: "employer4@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        username: "employer5",
        email: "employer5@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        username: "employer6",
        email: "employer6@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        username: "employer7",
        email: "employer7@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        username: "employer8",
        email: "employer8@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        username: "employer9",
        email: "employer9@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        username: "employer10",
        email: "employer10@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        username: "employer11",
        email: "employer11@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        username: "employer12",
        email: "employer12@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        username: "employer13",
        email: "employer13@example.com",
        role: "employer",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", {
      id: {
        [Sequelize.Op.in]: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
    });
  },
};
