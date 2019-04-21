import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import db from '../../models/v2/index';
import createAccountSchema from '../../helpers/accountsValidation';


const Accounts = {
    async createAccount(req, res) {
        const newAccount = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            type: req.body.type,
            status: 'draft',
            balance: 0.0,
            created_on: Date.now(),
        }

        const result = Joi.validate(newAccount, createAccountSchema);
            if (result.error){
                return res.status(400).send({
                    status: 400,
                    message: result.error.details[0].message
                });
            }

        const text = `INSERT INTO accounts(first_name, last_name, email, type, status, balance, created_on) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [newAccount.first_name, newAccount.last_name, newAccount.email, newAccount.type, newAccount.status, newAccount.balance, newAccount.created_on];

        const found = `SELECT * FROM users WHERE email = $1`;
        const response = await db.query(found, [req.body.email]);
        if(response.rows[0]) {
            try {
                const { rows } = await db.query(text, values);
                const payload = { email: req.body.email }
                jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '1h'}, (err, token) => {
                    return res.status(201).send({
                        status: 201,
                        token: token,
                        message: 'User bank account has been created successfully',
                        data: rows[0]
                    });
                });
                
            } catch(error) {
                return res.status(400).send(error.detail);
            }
        } else {
            return res.status(403).send({
                status: 403,
                message: 'Sorry you can only create a bank account if you have a user account'})
        }
        
        
    }
}

export default Accounts;