'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rolePermissions extends Model {
    static associate(models) {
      rolePermissions.belongsTo(models.Roles, { foreignKey: 'roleId', as: 'role' });
      rolePermissions.belongsTo(models.Permissions, { foreignKey: 'permissionId', as: 'permission' });
    }
  }
  
  rolePermissions.init({  // Corrected here
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rolePermissions',
  });

  return rolePermissions;
};
