'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_pasca', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_seller: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_transaction_admin: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      product_transaction_fee: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      product_sku: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_pasca');
  },
};
