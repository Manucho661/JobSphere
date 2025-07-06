'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const employers = [];

    for (let i = 2; i <= 20; i++) {
      employers.push({
        user_id: i,
        companyName: `Company ${i}`,
        email: `contact${i}@company.com`,
        contactPerson: `Person ${i}`,
        phone: `0700${i.toString().padStart(6, '0')}`,
        website: `https://www.company${i}.com`,
        location: `City ${i}`,
        industry: `Industry ${i % 5 === 0 ? 'Tech' : 'Finance'}`,
        companySize: `${10 + i * 5} - ${10 + i * 10} employees`,
        logoUrl: `https://logos.com/company${i}.png`,
        verified: i % 2 === 0, // true for even, false for odd
        companyDescription: `Company ${i} is a forward-thinking organization in Industry ${i}.`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('employers', employers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employers', null, {});
  }
};
