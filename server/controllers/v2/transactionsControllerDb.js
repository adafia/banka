import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import db from '../../models/v2/index';
import Joi from 'joi';
import transactionSchema from '../../helpers/transactionValidation';
import specificTransactionsSchema from '../../helpers/specificTransactionValidation';

const Transactions = {
    async getAllTransactions (req, res) {
        const fetchAll = 'SELECT * FROM transactions';
        try {
            const { rows, rowCount } = await db.query(fetchAll);
            jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
                if(err){
                    return res.status(403).send({
                        status: 403,
                        message: 'Forbidden access'
                    });
                } else if(authrizedData.is_admin === true){
                    return res.status(200).send({ rows, rowCount});
                } else {
                    return res.status(401).send({ message: 'You are not authorized'});
                }
            })
        } catch(error){
            return res.status(400).send(error);
        }
    },

    async accountDebit (req, res){
        let cashierEmail = '';
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
            if(err){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access'
                });
            } else if (authrizedData.is_cashier !== true){
                return res.status(401).send({ message: 'You are not authorized' });
            } else {
                cashierEmail = authrizedData.email
            }
        });
        const found = `SELECT * FROM users WHERE email = $1`;
        const cashier = await db.query(found, [cashierEmail]);

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
            } else if (rows[0].status !== 'active'){
                return res.status(400).send({
                    status: 400,
                    message: `Account with number ${debitDetails.account_number} is not yet active`
                });

            } else if (rows[0].balance > debitDetails.amount) {
                let oldBalance = rows[0].balance
                let newBalance = oldBalance - debitDetails.amount;
                const debitAccount = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *';
                const values = [newBalance, debitDetails.account_number];
                const response = await db.query(debitAccount, values);
                //creating a transaction
                const text = `INSERT INTO transactions(account_number, cashier, type, amount, old_balance, new_balance, created_on) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
                const transactvalues = [response.rows[0].account_number, cashier.rows[0].id, 'debit', debitDetails.amount, oldBalance, newBalance, new Date()];
                const newTransaction = await db.query(text, transactvalues);
                return res.status(200).send({
                    status: 200,
                    message: `Account with number ${debitDetails.account_number} has been debited with ${debitDetails.amount} the new balance is ${newBalance}`,
                    data: newTransaction.rows[0]
                }); 
            } else {
                return res.status(405).json({ 
                    status: 405,
                    message : `Sorry account with number: ${debitDetails.account_number} has insufficient funds for this transaction`
                });
            }
        } catch(err) {
            return res.status(400).send(err);
        }

    },

    async accountCredit (req, res){
        let cashierEmail = '';
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
                    
            if(err){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access'
                });
            } else if(authrizedData.is_cashier !== true){
                return res.status(401).send({message: 'You are not authorized'});
                 
            } else {
                cashierEmail = authrizedData.email
            }
        })
        const found = `SELECT * FROM users WHERE email = $1`;
        const cashier = await db.query(found, [cashierEmail]);

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
            } else if(rows[0].status === 'active'){
                let oldBalance = rows[0].balance
                let newBalance = oldBalance + creditDetails.amount;
                const creditAccount = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *';
                const values = [newBalance, creditDetails.account_number];
                const response = await db.query(creditAccount, values);
                //creating a transaction
                const text = `INSERT INTO transactions(account_number, cashier, type, amount, old_balance, new_balance, created_on) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
                const transactvalues = [response.rows[0].account_number, cashier.rows[0].id, 'credit', creditDetails.amount, oldBalance, newBalance, new Date()];
                const newTransaction = await db.query(text, transactvalues);
                return res.status(200).send({
                    status: 200,
                    message: `Account with number ${creditDetails.account_number} has been credited with ${creditDetails.amount} the new balance is ${newBalance}`,
                    data: newTransaction.rows[0]
                }); 
            } else {
                return res.status(400).send({
                    status: 400,
                    message: `Account with number ${creditDetails.account_number} is not yet active`
                });
            }
        } catch(err) {
            return res.status(400).send(err);
        }

    },

    async getTransactionHistory(req, res){
        let userEmail = '';
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
            if(err){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access'
                });
            } else {
                userEmail = authrizedData.email;
            }
        });
        console.log(userEmail);

        const found = `SELECT * FROM users WHERE email = $1`;
        const response = await db.query(found, [userEmail]);
        const text = 'SELECT * FROM transactions WHERE account_number =$1';
        const { rows } = await db.query(text, [req.params.accountNumber]);
        const accountSearch = 'SELECT * FROM accounts WHERE owner =$1';
        if(response.rows[0]) {
            const isOwner = await db.query(accountSearch, [response.rows[0].id]);
            if(isOwner.rows[0]) {
                if(!rows[0]){
                    return res.status(404).send({
                        status: 404,
                        message: 'No transactions have occured involving your account'
                    });
                } else {
                    return res.status(200).send({
                        status: 200,
                        message: `Transactions for account with number ${req.params.accountNumber} have been fetched successfully`,
                        data: rows
                    });
                } 
            } else {
                return res.status(403).send({
                    status: 403,
                    message: 'Sorry you can only view transactions of accounts you own'})
            }
        } else {
            return res.status(404).send({
                status: 404,
                message: 'Sorry, this feature is reserved for users only'});
        }
           
    },

    async viewSpecificTransaction(req, res){
        const userDetails = {
            id: req.params.id
        }
        let userInfo = '';
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
            if(err){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access'
                });
            } else {
                userInfo = authrizedData;
            }
        });
        const allow = Joi.validate(userDetails, specificTransactionsSchema)
        if (allow.error){
            return res.status(400).send({
                status: 400,
                message: allow.error.details[0].message
            });
        }

        const text = 'SELECT * FROM transactions WHERE id = $1';
        const { rows } = await db.query(text, [req.params.id]);
        if(!rows[0]) {
            return res.status(404).send({
                status: 404,
                message: `Transaction with id: ${req.params.id} does not exist`
            });
        }

        const accountSearch = 'SELECT * FROM accounts WHERE account_number =$1';
        const isOwner = await db.query(accountSearch, [rows[0].account_number]);
        

        const found = `SELECT * FROM users WHERE email = $1`;
        const response = await db.query(found, [userInfo.email]);
        if(!response.rows[0]){
            return res.status(404).send({
                status: 404,
                message: 'Sorry, this feature is reserved for users only'});
        }

        if(isOwner.rows[0].owner === response.rows[0].id){
            return res.status(200).send({
                status: 200,
                message: `Transaction with id: ${req.params.id} has been fetched successfully`,
                data: rows[0]
            });
        } else {
            return res.status(403).send({
                status: 403,
                message: 'Sorry you can only view transactions of accounts you own'
            });
        }

        

    }
}

export default Transactions;