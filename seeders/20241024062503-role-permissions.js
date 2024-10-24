'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('rolePermissions', [
    {
       roleId: 1,
       permissionId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      roleId: 1,
      permissionId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleId: 1,
      permissionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleId: 1,
      permissionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleId: 1,
      permissionId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleId: 2,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('rolePermissions', null, {});
  
  }
};
