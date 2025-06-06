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
      Roles.hasMany(models.Users, { foreignKey: 'roleId', as: 'user' });
      Roles.hasMany(models.rolePermissions, { foreignKey: 'roleId', as: 'RolePermission' });
    }
  }
  Roles.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });

  return Roles;
};