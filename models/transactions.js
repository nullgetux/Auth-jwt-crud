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
    }
  }
  transactions.init({
      trans_no: DataTypes.STRING,
      transaction_status: DataTypes.STRING,
      transaction_type: DataTypes.STRING,
      product_provider: DataTypes.STRING,
      transaction_amount: DataTypes.INTEGER,
      product_sku: DataTypes.STRING,
      transaction_reference: DataTypes.STRING,
      transaction_message: DataTypes.STRING,
      transaction_userid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transactions',
  });
    
  
  return transactions;
};