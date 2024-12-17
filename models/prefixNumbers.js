'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class prefixNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prefixNumbers.belongsTo(models.productPrepaids, { 
        foreignKey: 'product_provider', 
        as: 'prefixproduct' });
    }
  }

  prefixNumbers.init(
    {
      number: DataTypes.STRING,
      provider: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'prefixNumbers',
    }
  );

  return prefixNumbers;
};
