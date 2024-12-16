'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Roles, { 
        foreignKey: 'roleId', 
        as: 'role' });
      Users.hasMany(models.transactions, { 
        foreignKey: 'transaction_userid', 
        as: 'userid'});
    }
  }
  Users.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
    
  
  return Users;
};