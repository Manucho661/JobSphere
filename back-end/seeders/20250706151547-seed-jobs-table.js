'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jobs', [
      {
        employer_id: 2,
        title: 'Frontend Developer',
        description: 'Develop and maintain UI components using React and Tailwind.',
        location: 'Nairobi, Kenya',
        salary: 'Ksh 120,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 3,
        title: 'Backend Engineer',
        description: 'Design APIs and manage backend systems using Node.js.',
        location: 'Remote',
        salary: 'Ksh 150,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 4,
        title: 'Mobile App Developer',
        description: 'Develop Android/iOS applications using Flutter.',
        location: 'Kampala, Uganda',
        salary: 'Ksh 130,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 5,
        title: 'DevOps Engineer',
        description: 'Setup CI/CD pipelines and manage cloud infrastructure.',
        location: 'Nairobi, Kenya',
        salary: 'Ksh 170,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 6,
        title: 'UI/UX Designer',
        description: 'Design user interfaces and improve user experience across platforms.',
        location: 'Remote',
        salary: 'Ksh 110,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 7,
        title: 'Data Analyst',
        description: 'Analyze business data and generate insights using SQL and Python.',
        location: 'Lagos, Nigeria',
        salary: 'Ksh 140,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 8,
        title: 'Machine Learning Engineer',
        description: 'Develop ML models and productionize AI solutions.',
        location: 'Remote',
        salary: 'Ksh 200,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 9,
        title: 'System Administrator',
        description: 'Manage Linux servers and ensure uptime and security.',
        location: 'Nairobi, Kenya',
        salary: 'Ksh 100,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 10,
        title: 'Project Manager',
        description: 'Lead development teams and manage project timelines.',
        location: 'Accra, Ghana',
        salary: 'Ksh 160,000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employer_id: 11,
        title: 'QA Engineer',
        description: 'Perform testing and maintain product quality using automated tools.',
        location: 'Remote',
        salary: 'Ksh 115,000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jobs', null, {});
  }
};
