import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default {
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
    }
}