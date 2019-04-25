import keys from '../../config/keys'
import { Pool } from 'pg';

let pool;
if(process.env.NODE_ENV === 'production'){
    pool = new Pool({
        connectionString: keys.DATABASE_URL
    });
}

if(process.env.NODE_ENV === 'test'){
    pool = new Pool({
        connectionString: keys.DATABASE_URL
    });
}else {
    pool = new Pool({
        connectionString: keys.DATABASE_URL
    });
}



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