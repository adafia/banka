const express = require('express');
const uuid = require('uuid');
const accountsRouter = express.Router();
const accounts = require('../../models/Account');

// Get all accounts
accountsRouter.get('/', (req, res) => res.json(accounts));


// Create a Bank Account
accountsRouter.post('/', (req, res) => {
    const newAccount = {
        id : uuid.v4(),
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : req.body.owner,
        type : req.body.type,
        status : 'draft',
        balance : 0 
    }

    if(!newAccount.owner || !newAccount.type) {
        return res.status(400).json({ msg: 'Please include your user id and account type'});
    }

    accounts.push(newAccount);
    res.json(accounts);
});

module.exports = accountsRouter;