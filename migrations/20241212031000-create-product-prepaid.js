'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_prepaid', {
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
      product_desc: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      product_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_seller: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_seller_price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      product_buyer_price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      product_sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      product_unlimited_stok: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      product_stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      product_multi: {
        type: Sequelize.STRING,
        defaultValue: false,
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
    await queryInterface.dropTable('product_prepaid');
  },
};
