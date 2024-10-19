// Middleware untuk memeriksa role user
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.roleName)) {
        console.log('Role Name:', req.user.roleName)
        return res.status(403).send('Access denied');
      }
      next();
    };
  };
  
  module.exports = authorizeRoles;