// middleware/authorizeRoles.js
const { rolePermissions, Permissions, Roles } = require('../models');  // Ensure paths and model names are correct

const authorizeRoles = (action, subject) => {
  return async (req, res, next) => {
    try {
      const userRoleName = req.user.roleName; // Assuming roleName is stored in the JWT

      if (!userRoleName) {
        return res.status(403).json({ message: 'Access denied: No role assigned to user.' });
      }

      // Combine role and permission fetching into one query
      const userRoleWithPermissions = await Roles.findOne({
        where: { nama: userRoleName },
        include: [{
          model: rolePermissions,
          as: 'RolePermission', // Adjust based on your association
          include: [{
            model: Permissions,
            as: 'permission',
            required: true
          }]
        }]
      });

      if (!userRoleWithPermissions) {
        return res.status(403).json({ message: 'Access denied: Role not found.' });
      }

      // Check if the role has the required permission
      const hasPermission = userRoleWithPermissions.RolePermission.some(rolePermission => {
        return rolePermission.permission.action === action && rolePermission.permission.subject === subject;
      });

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied: You do not have access to this route.' });
      }

      next();
    } catch (error) {
      console.error('Error in authorizeRoles middleware:', error); // Log error for debugging
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = authorizeRoles;
