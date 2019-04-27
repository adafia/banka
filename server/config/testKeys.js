import dotenv from 'dotenv';
dotenv.config()

module.exports = {
    DATABASE_URL: process.env.TEST_DATABASE_URL,
    SECRET_OR_KEY: process.env.SECRET_OR_KEY 
}