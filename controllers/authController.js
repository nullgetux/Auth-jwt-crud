// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users, Roles} = require('../models');

const saltRounds = 10;

const authController = {
    // Register
    register: async (req, res) => {
        const { nama, password, email, roleId } = req.body;
        try {
            // Check if the email already exists in the database
            const existingUser = await Users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    error: 'Registration failed',
                    details: 'Email already in use'
                });
            }
    
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await Users.create(
                { 
                    nama, 
                    password: hashedPassword, 
                    email,
                    roleId
                });
            res.status(201).json(
                { message: 'User registered successfully', 
                    user 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'Registration failed', 
                    details: error.message 
                });
        }
    },

    // Login
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Query the user based on email
            const user = await Users.findOne({ 
                where: { email },
                include: [{ model: Roles, attributes: ['nama'], as: 'role' }]
             });
            if (!user) {
                return res.status(401).json({ error: 'Email Not Register' });
            }
             // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

           // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, roleName: user.role.nama },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION }
            );

            req.user = {
                id: user.id,
                email: user.email,
                roleName: user.role.name // Attach role name here
            };

            // Set the token in a cookie
            res.cookie('token', token, {
                httpOnly: true, // Prevent client-side JS access
                //secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
                maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10), 
                sameSite: 'strict', // CSRF protection
            });

            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            return res.status(400).json({ error: 'Login failed', details: error.message });
        }
    },

    // Logout (just a placeholder)
    logout: (req, res) => {
        // Clear the 'token' cookie
        res.clearCookie('token', {
            httpOnly: true, // Same options used when the cookie was set
            //secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict',
        });
        res.status(200).json(
            { 
                message: 'Logged out successfully' 
            });
    },
};

module.exports = authController;
