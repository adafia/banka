const keys = require('../config/keys');
const { Pool } = require('pg');

const connectionString = keys.DATABASE_URL;

const pool = new Pool({ connectionString });

module.exports = {
    query(text, params){
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    pool
}
