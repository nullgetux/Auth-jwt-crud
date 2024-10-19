// Middleware untuk memeriksa role user
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.roleId)) {
        console.log('Role ID:', req.user.roleId);
        return res.status(403).send('Access denied');
      }
      next();
    };
  };
  
  module.exports = authorizeRoles;