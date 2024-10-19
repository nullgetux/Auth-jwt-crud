'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roles.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  Role.associate = function(models) {
    // One role can have many users
    Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
  };

  return Roles;
};