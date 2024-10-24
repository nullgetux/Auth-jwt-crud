'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    static associate(models) {
      Permissions.hasMany(models.rolePermissions, { foreignKey: 'permissionId', as: 'rolePermission' });
    }
  }
  Permissions.init({
    action: DataTypes.STRING,
    subject: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permissions',
  });

  return Permissions;
};
