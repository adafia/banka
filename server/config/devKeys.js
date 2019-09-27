const dotenv = require('dotenv');
dotenv.config();

module.exports =  {
    DATABASE_URL: process.env.DEV_DATABASE_URL || 'postgres://ghiudlwz:miVKNlp7mMIYP16B6zUw_png_kPHARkR@isilo.db.elephantsql.com:5432/ghiudlwz',
    SECRET_OR_KEY: process.env.SECRET_OR_KEY 
}