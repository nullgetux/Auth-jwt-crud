const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const date = new Date();

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const wibDate = date;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Use user routes


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log(date.toLocaleString('en-US', process.env.TZ));
