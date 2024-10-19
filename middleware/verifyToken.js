const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Check if the authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send('Token not provided');
  }

  // Extract the token by removing 'Bearer ' prefix
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    // Store the decoded user info in the request object
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
