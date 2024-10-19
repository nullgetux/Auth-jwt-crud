'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12341234', 10); // Hash password
    await queryInterface.bulkInsert('users', [
      {
      id: 1,
      nama: 'admin',
      password: hashedPassword, // Gunakan password yang sudah di-hash
      email: 'admin@gmail.com', // Perbaiki typo di email
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      nama: 'John Doe',
      password: hashedPassword, // Gunakan password yang sudah di-hash
      email: 'slamet@gmail.com', // Perbaiki typo di email
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        id: 3,
        nama: 'ujang',
        password: hashedPassword, // Gunakan password yang sudah di-hash
        email: 'ujang@gmail.com', // Perbaiki typo di email
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
        }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { id: [1,2,3] }, {});
  }
};
