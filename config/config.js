require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST, // you might want to use a different test DB
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PRODUCTION, // you might want to use a different production DB
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',
  }
};
