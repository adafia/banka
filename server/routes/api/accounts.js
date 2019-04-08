const express = require('express');
const uuid = require('uuid');
const accountsRouter = express.Router();
const accounts = require('../../models/Account');
const users = require('../../models/Users');

// Get all accounts
accountsRouter.get('/', (req, res) => res.json(accounts));


// Create a Bank Account
accountsRouter.post('/', (req, res) => {
    const newAccount = {
        id : accounts.length + 1,
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : '',
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        type : req.body.type,
        status : 'draft',
        balance : 0.0 
    }

    if(!newAccount.firstName || !newAccount.lastName || !newAccount.email || !newAccount.type) {
        return res.status(400).json({ msg: 'Please fill all input fields'});
    }

    const validName = /^[A-Za-z]*$/
    const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
        
    if(typeof(newAccount.firstName) === 'number' || typeof(newAccount.lastName) === 'number' || typeof(newAccount.email) === 'number' || typeof(newAccount.type) === 'number') {
        return res.status(400).json({ msg: 'Your first name, last name, email or account type can not be numbers only'});
    }

    if(!newAccount.firstName.match(validName) || !newAccount.lastName.match(validName) || !newAccount.email.match(validEmail)) {
        return res.status(400).json({ msg: 'All or at least one of your inputs are invalid, please provide the appropriate characters for each input field'});
    }

    const found = users.some(user => user.email === newAccount.email);

    if(!found) {
       res.status(404).json({ msg: 'You are not signed in or you do not have a user account yet, please sign in or sign up and return to this page'});
    } else {
       let owner = users.filter(user => user.email === newAccount.email) 
       newAccount.owner = owner[0].id;
    }

    let isType = 'savings' || 'current';

    if(!isType) {
        return res.status(400).json({ msg: 'Sorry your account type can be either savings or current.'})
    }

    accounts.push(newAccount);
    res.json(accounts);
});

// Admin or staff can activate or deactivate a bank account
accountsRouter.patch('/:accountNumber', (req, res) => {
    if(parseInt(req.params.accountNumber) === isNaN) {
        return res.status(400).json({ msg: `Account number should be an integer`});
    }

    const userDetails = {
        email : req.body.email,
        password : req.body.password
    }

    if(!userDetails.email || !userDetails.password) {
        return res.status(400).json({ msg: 'Please input your email and password'});
    }

    const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
    const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    
    if(typeof(userDetails.email) === 'number' || typeof(userDetails.password) === 'number') {
        return res.status(400).json({ msg: 'Your email or password can not contain numbers only.'});
    }

    if(!userDetails.email.match(validEmail) || !userDetails.password.match(validPassword)) {
        return res.status(400).json({ msg: 'Your email must follow the standard email format and your password should have at least one upper case English letter,one lower case English letter, one digit, one special character and a Minimum eight characters'});
    }

    const isAuthrized = users.some(user => user.email === userDetails.email && user.password === userDetails.password && user.type === 'staff');

    if(!isAuthrized) {
        return res.status(400).json({ msg: 'You are not authorized to perform this activity'});
    }
    

    const found = accounts.some(account => account.accountNumber === parseInt(req.params.accountNumber));
    if(found) {
        const updAccount = req.body;  
        accounts.forEach(account => {
            if (account.accountNumber === parseInt(req.params.accountNumber)) {

                let option = 'active' || 'dormant';
                if(updAccount.status !== option) {
                    return res.status(400).json({ msg: 'Sorry you can only set status to active or dormant.'})
                }
                account.status = updAccount.status ? updAccount.status : account.status;
                res.status(200).json({ 
                    msg: `Account with number ${req.params.accountNumber} has been made ${updAccount.status}`,
                    data: account});
            }
        });
    } else {
        res.status(400).json({ msg: `Account number: ${req.params.accountNumber} does not exist`});
    }
})

module.exports = accountsRouter;