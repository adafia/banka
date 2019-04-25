import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import db from '../../models/v2/index';
import activateSchema from '../../helpers/activateDeactivateValidation';
import createAccountSchema from '../../helpers/accountsValidation';


const Accounts = {
    async getAllaccounts(req, res){
        const fetchAll = 'SELECT * FROM accounts';
        try {
            const { rows, rowCount } = await db.query(fetchAll);
            jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
                if(err){
                    return res.status(403).send({
                        status: 403,
                        message: 'Forbidden access'
                    });
                } else {
                    if(authrizedData.is_admin === true){
                        return res.status(200).send({ rows, rowCount});
                    } else {
                        res.status(401).send({
                            status: 401,
                            message: 'You are not authorized to access this information'
                        });
                    }
                    
                }
            });
        } catch(error){
            return res.status(400).send(error);
        }
    },

    async createAccount(req, res) {
        const newAccount = {
            account_number: Math.floor(Math.random() * 10000000),
            type: req.body.type,
            status: 'draft',
            balance: 0.0,
            created_on: new Date(),
        }
        const result = Joi.validate(newAccount, createAccountSchema);
        if(result.error){
            return res.status(400).send({
                status: 400,
                message: result.error.details[0].message
            });
        }
        let userInfo = '';
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (error, authrizedData) => {
            if (error){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access'
                });
            } else {
                if(authrizedData.type !== 'client'){
                    return res.status(401).send({message: 'You are not authorized'});
                }  
            }
            userInfo = authrizedData
        });

        const search = 'SELECT * FROM users WHERE email = $1';
        const found = await db.query(search, [userInfo.email]);
        if(!found.rows[0]){
            return res.status(404).send('Sorry, you can only create a bank account if you are a user')
        }

        let owner = found.rows[0].id;

        const text = `INSERT INTO accounts(account_number, first_name, last_name, email, owner, type, status, balance, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        const values = [newAccount.account_number, found.rows[0].first_name, found.rows[0].last_name, found.rows[0].email, owner, newAccount.type,  newAccount.status, newAccount.balance, newAccount.created_on];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send({
                status: 201,
                message: 'Your account has been created successfully',
                data: {
                    accountNumber: rows[0].account_number,
                    firstName: rows[0].first_name,
                    lastName: rows[0].last_name,
                    email: rows[0].email,
                    type: rows[0].type
                }
            });
        } catch(error){
            return res.status(400).send(error);
        }

    },

    async accountActivateDeactivate(req, res) {
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

        const findAccount = 'SELECT * FROM accounts WHERE account_number = $1';
        const upDateAcc = 'UPDATE accounts SET status = $1 WHERE account_number = $2 RETURNING *';
        const values = [accountUpdate.status, accountUpdate.account_number];

        try {
            const { rows } = await db.query(findAccount, [req.params.accountNumber]);
            if(rows[0]){
                jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
                    if(err){
                        return res.status(403).send({
                            status: 403,
                            message: 'Forbidden access'
                        });
                    } else {
                        if(authrizedData.is_admin !== true){
                            return res.status(401).send({message: 'You are not authorized'});
                        }   
                    }
                })
                const response = await db.query(upDateAcc, values);
                return res.status(200).send({
                    status: 200,
                    message: `Account with number ${accountUpdate.account_number} has been made ${accountUpdate.status}`,
                    data: response.rows[0]
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    message: 'Account number does not exist'
                });
            }
        } catch(err) {
            return res.status(400).send(err);
        }
    },

    async deleteAccount(req, res){
        let isAuth = ''
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
            if(err){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access'
                });
            }
            isAuth = authrizedData.is_admin
        });

        if(isAuth === false){
            return res.status(401).send({message: 'You are not authorized'});
        }
        const findAccount = 'SELECT * FROM accounts WHERE account_number = $1';
        const { rows } = await db.query(findAccount, [req.params.accountNumber]);
        try {
            if(!rows[0]) {
                return res.status(404).send({
                    status: 404,
                    message: `Account with number: ${req.params.accountNumber} does not exist`
                });
            } else if(isAuth === true){
                const deleteAccount = 'DELETE FROM accounts WHERE account_number = $1 RETURNING *';
                await db.query(deleteAccount, [req.params.accountNumber]);
                return res.status(200).send({
                    status: 200,
                    message: `Account with number: ${req.params.accountNumber} has been deleted`
                });
            }
        } catch(error){
            return res.status(400).send(error);
        }
        
        
    },

    async userViewAccount(req, res){
        let userInfo = '';
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) =>{
            if(err){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access (403)'
                });
            } else {
                userInfo = authrizedData;
            }
        });

        const findAccount = 'SELECT * FROM accounts WHERE account_number = $1';
        const { rows } = await db.query(findAccount, [req.params.accountNumber]);
        if(rows[0]){
            if(userInfo.email === rows[0].email){
                return res.status(200).send({
                    status: 200,
                    message: `Account with number ${req.params.accountNumber} has been fetched successfully`,
                    data: rows[0]
                });
            } else {
                return res.status(403).send({
                    status: 403,
                    message: 'You can only view details of accounts you own'
                });
            }
        } else {
            return res.status(404).send({
                status: 404,
                message: `Account with number ${req.params.accountNumber} does not exist`
            });
        }
    }
}

export default Accounts;