// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

const userController = {
    // Create User
    createUser: async (req, res) => {
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
                { 
                    message: 'User created successfully', 
                    user 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'User creation failed', 
                    details: error.message 
                });
        }
    },

    // Read All Users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: 'Failed to retrieve users', details: error.message });
        }
    },

    // Read User by ID
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json(
                    { 
                        error: 'User not found' 
                    });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'Failed to retrieve user', 
                    details: error.message 
                });
        }
    },

    // Update User
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { username, password, email } = req.body;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json(
                    { 
                        error: 'User not found' 
                    });
            }

            if (password) {
                user.password = await bcrypt.hash(password, saltRounds);
            }
            user.username = username || user.username;
            user.email = email || user.email;

            await user.save();
            res.status(200).json(
                { 
                    message: 'User updated successfully', 
                    user 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'User update failed', 
                    details: error.message 
                });
        }
    },

    // Delete User
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json(
                    { 
                        error: 'User not found' 
                    });
            }
            await user.destroy();
            res.status(200).json(
                { 
                    message: 'User deleted successfully' 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'User deletion failed', 
                    details: error.message 
                });
        }
    },
};

module.exports = userController;
