import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import db from '../../models/v2/index';
import createAccountSchema from '../../helpers/accountsValidation';
import activateSchema from '../../helpers/activateDeactivateValidation';
import loginSchema from '../../helpers/loginValidation';


const Accounts = {
    async getAllaccounts(req, res){
        const fetchAll = 'SELECT * FROM accounts';
        try {
            const { rows, rowCount } = await db.query(fetchAll);
            return res.status(200).send({ rows, rowCount});
        } catch(error){
            return res.status(400).send(error);
        }
    },
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
        
        
    },

    async accountActivateDeactivate(req, res) {
        const userDetails = {
            email : req.body.email,
            password : req.body.password
        }
        const allow = Joi.validate(userDetails, loginSchema)
        if (allow.error){
            return res.status(400).send({
                status: 400,
                message: allow.error.details[0].message
            });
        }
        const found = `SELECT * FROM users WHERE email = $1`;
        const response = await db.query(found, [req.body.email]);
        if(response.rows[0].is_admin !== true){
            return res.status(401).send({
                status: 401,
                message: 'You are not authorized to perform this function'
            });
        }
        if(response.rows[0].password !== req.body.password){
            return res.status(403).send({
                status: 403,
                message: 'Invalid password'
            });
        }

        const accountUpdate = {
            status: req.body.status,
            account_number: req.params.accountNumber
        }

        const result = Joi.validate(accountUpdate, activateSchema);
        if(result.error){
            return res.status(400).send({
                status: 400,
                message: result.error.details[0].message
            });
        }

        const findAccount = 'SELECT * FROM accounts WHERE id = $1';
        const upDateAcc = 'UPDATE accounts SET status = $1 WHERE account_number = $2 RETURNING *';
        const values = [accountUpdate.status, accountUpdate.account_number];

        try {
            const { rows } = await db.query(findAccount, [req.params.accountNumber]);
            if(!rows[0]){
                return res.status(404).send({
                    status: 404,
                    message: 'Account number does not exist'
                });
            } else {
                const response = await db.query(upDateAcc, values);
                return res.status(200).send({
                    status: 200,
                    message: `Account with number ${accountUpdate.account_number} has been made ${accountUpdate.status}`,
                    data: response.rows[0]
                });
            }
        } catch(err) {
            return res.status(400).send(err);
        }
    }
}

export default Accounts;