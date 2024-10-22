const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi JWT
const verifyToken = (req, res, next) => {
 // Extract the token from the cookies
 const token = req.cookies.token;

 // Check if the token exists in the cookies
 if (!token) {
  return res.status(403).send('Token not provided');
}

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
