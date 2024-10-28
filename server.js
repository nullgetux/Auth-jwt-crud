const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cookieParse = require('cookie-parser');
const date = new Date();

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const wibDate = date;

// Middleware
app.use(cors({
    origin: 'http://localhost:3002', // Change this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // If you need to allow cookies
}));
app.use(bodyParser.json());
app.use(cookieParse());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Use user routes


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log(date.toLocaleString('en-US', process.env.TZ));
