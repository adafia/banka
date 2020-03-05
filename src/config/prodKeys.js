require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.PROD_DATABASE_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY
};
