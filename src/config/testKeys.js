require('dotenv').config();;

module.exports = {
    DATABASE_URL: process.env.TEST_DATABASE_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY
};
