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
      // Define the association
      prefixNumbers.hasMany(models.productPrepaids, { 
        foreignKey: 'provider', 
        as: 'prepaids' });
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
