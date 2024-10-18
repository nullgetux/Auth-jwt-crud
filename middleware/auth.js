const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token is no longer valid
        }
        req.user = user; // Store user information in the request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
