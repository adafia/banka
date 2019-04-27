const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    DATABASE_URL: process.env.DEV_DATABASE_URL,
    SECRET_OR_KEY: process.env.SECRET_OR_KEY 
}