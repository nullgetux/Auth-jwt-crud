'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        transactions.belongsTo(models.Users, { 
            foreignKey: 'transaction_userid', 
            as: 'userid' });
        transactions.belongsTo(models.productPrepaids, { 
        foreignKey: 'product_provider', 
        as: 'transactionprepaid' });
    }
  }
  transactions.init({
      trans_no: DataTypes.STRING,
      transaction_status: DataTypes.STRING,
      transaction_reference: DataTypes.STRING,
      transaction_category: DataTypes.STRING,
      product_provider: DataTypes.STRING,
      transaction_amount: DataTypes.INTEGER,
      seller_price: DataTypes.INTEGER,
      product_sku: DataTypes.STRING,
      customer_no: DataTypes.STRING,
      transaction_sn: DataTypes.STRING,
      transaction_message: DataTypes.STRING,
      transaction_userid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transactions',
  });
    
  
  return transactions;
};