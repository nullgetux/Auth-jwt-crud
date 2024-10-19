'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12341234', 10); // Hash password
    await queryInterface.bulkInsert('users', [{
      id: 10,
      nama: 'John Doe',
      password: hashedPassword, // Gunakan password yang sudah di-hash
      email: 'selamet@gmail.com', // Perbaiki typo di email
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { id: 10 }, {});
  }
};
