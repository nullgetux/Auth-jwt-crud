'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      trans_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      transaction_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_reference: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      seller_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      product_sku: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customer_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_sn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_userid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',  
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('transactions');
  },
};
