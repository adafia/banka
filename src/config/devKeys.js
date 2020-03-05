require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DEV_DATABASE_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY
};
