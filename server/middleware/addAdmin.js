import db from '../models/v2/index';

const addAdmin = (req, res, next) => {
    const text = `INSERT INTO users(first_name, last_name, email, password, type, is_admin, created_on) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = ['Samuel', 'Adafia', 'adafia@gmail.com', 'Password-1234', 'staff', true, new Date()];
    
    db.query(text, values);
    next();
}

export default addAdmin;