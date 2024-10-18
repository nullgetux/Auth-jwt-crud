// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const saltRounds = 10;

const authController = {
    // Register
    register: async (req, res) => {
        const { username, password, email } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create(
                { 
                    username, 
                    password: hashedPassword, 
                    email 
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
        const { username, password } = req.body;
        try {
            const user = await User.findOne(
                { 
                    where: { username } 
                });
            if (!user) {
                return res.status(401).json(
                    { 
                        error: 'Invalid credentials' }
                    );
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json(
                    { 
                        error: 'Invalid credentials' 
                    });
            }
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json(
                { 
                    message: 'Login successful', 
                    token 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'Login failed', 
                    details: error.message 
                });
        }
    },

    // Logout (just a placeholder)
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json(
            { 
                message: 'Logged out successfully' 
            });
    },
};

module.exports = authController;
