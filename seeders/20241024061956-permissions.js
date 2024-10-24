'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Permissions', [
      {
        action: 'getAllUsers',
        subject: "Users",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'getUserById',
        subject: "Users",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'createUser',
        subject: "Users",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'updateUser',
        subject: "Users",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'deleteUser',
        subject: "Users",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
     
  }
};
