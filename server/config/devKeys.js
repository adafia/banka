const dotenv = require('dotenv');
dotenv.config();

module.exports =  {
    DATABASE_URL: process.env.DEV_DATABASE_URL || 'postgres://postgres:12345@127.0.0.1:5432/banka_db',
    SECRET_OR_KEY: process.env.SECRET_OR_KEY 
}