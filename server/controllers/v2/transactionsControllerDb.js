import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import db from '../../models/v2/index';
import checkToken from '../../helpers/checkToken';
import Joi from 'joi';
import loginSchema from '../../helpers/loginValidation';
import transactionSchema from '../../helpers/transactionValidation';

const Transactions = {
    async getAllTransactions (req, res) {
        const fetchAll = 'SELECT * FROM transactions';
        try {
            const { rows, rowCount } = await db.query(fetchAll);
            return res.status(200).send({ rows, rowCount});
        } catch(error){
            return res.status(400).send(error);
        }
    },

    async accountDebit (req, res){
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
        const cashier = await db.query(found, [req.body.email]);
        if(cashier.rows[0].type !== 'staff'){
            return res.status(401).send({
                status: 401,
                message: 'You are not authorized to perform this function'
            });
        }
        if(cashier.rows[0].password !== req.body.password){
            return res.status(403).send({
                status: 403,
                message: 'Invalid password'
            });
        }

        const debitDetails = {
            amount: req.body.amount,
            account_number: req.params.accountNumber
        }
        const result = Joi.validate(debitDetails, transactionSchema);
        if(result.error){
            return res.status(400).send({
                status: 400,
                message: result.error.details[0].message
            });
        }

        const findAccount = 'SELECT * FROM accounts WHERE account_number = $1';

        try {
            const { rows } = await db.query(findAccount, [req.params.accountNumber]);
            if(!rows[0]){
                return res.status(404).send({
                    status: 404,
                    message: 'Account number does not exist'
                });
            } else {
                if(rows[0].balance > debitDetails.amount){
                    let oldBalance = rows[0].balance
                    let newBalance = oldBalance - debitDetails.amount;
                    const debitAccount = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *';
                    const values = [newBalance, debitDetails.account_number];
                    const response = await db.query(debitAccount, values);
                    //creating a transaction
                    const text = `INSERT INTO transactions(account_number, cashier, type, old_balance, new_balance, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
                    const transactvalues = [response.rows[0].account_number, cashier.rows[0].id, 'debit', oldBalance, newBalance, Date.now()];
                    const newTransaction = await db.query(text, transactvalues);
                    return res.status(200).send({
                        status: 200,
                        message: `Account with number ${debitDetails.account_number} has been made debited with ${debitDetails.amount} the new balance is ${newBalance}`,
                        data: response.rows[0],
                        new_transaction: newTransaction.rows[0]
                    });
                } else {
                    return res.status(405).json({ 
                        status: 405,
                        message : `Sorry account with number: ${debitDetails.account_number} has insufficient funds for this transaction`
                    });
                }
                
            }
        } catch(err) {
            return res.status(400).send(err);
        }

    },

    async accountCredit (req, res){
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
        const cashier = await db.query(found, [req.body.email]);
        if(cashier.rows[0].type !== 'staff'){
            return res.status(401).send({
                status: 401,
                message: 'You are not authorized to perform this function'
            });
        }
        if(cashier.rows[0].password !== req.body.password){
            return res.status(403).send({
                status: 403,
                message: 'Invalid password'
            });
        }

        const creditDetails = {
            amount: req.body.amount,
            account_number: req.params.accountNumber
        }
        const result = Joi.validate(creditDetails, transactionSchema);
        if(result.error){
            return res.status(400).send({
                status: 400,
                message: result.error.details[0].message
            });
        }

        const findAccount = 'SELECT * FROM accounts WHERE account_number = $1';

        try {
            const { rows } = await db.query(findAccount, [req.params.accountNumber]);
            if(!rows[0]){
                return res.status(404).send({
                    status: 404,
                    message: 'Account number does not exist'
                });
            } else {
                let oldBalance = rows[0].balance
                let newBalance = oldBalance + creditDetails.amount;
                const creditAccount = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *';
                const values = [newBalance, creditDetails.account_number];
                const response = await db.query(creditAccount, values);
                //creating a transaction
                const text = `INSERT INTO transactions(account_number, cashier, type, old_balance, new_balance, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
                const transactvalues = [response.rows[0].account_number, cashier.rows[0].id, 'credit', oldBalance, newBalance, Date.now()];
                const newTransaction = await db.query(text, transactvalues);
                return res.status(200).send({
                    status: 200,
                    message: `Account with number ${creditDetails.account_number} has been made credited with ${creditDetails.amount} the new balance is ${newBalance}`,
                    data: response.rows[0],
                    new_transaction: newTransaction.rows[0]
                });
                
            }
        } catch(err) {
            return res.status(400).send(err);
        }

    }
}

export default Transactions;