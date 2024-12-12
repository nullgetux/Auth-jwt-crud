'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class productPrepaids extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
    }
  }

  productPrepaids.init(
    {
      product_name: DataTypes.STRING,
      product_desc: DataTypes.TEXT,
      product_category: DataTypes.STRING,
      product_provider: DataTypes.STRING,
      product_type: DataTypes.STRING,
      product_seller: DataTypes.STRING,
      product_seller_price: DataTypes.FLOAT,
      product_buyer_price: DataTypes.FLOAT,
      product_sku: DataTypes.STRING,
      product_unlimited_stok: DataTypes.STRING,
      product_stock: DataTypes.INTEGER,
      product_multi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'productPrepaids',
    }
  );

  return productPrepaids;
};
