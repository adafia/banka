import accounts from '../../models/v1/Account';
import users from '../../models/v1/Users';

class Accounts {
   static getAllAccounts(req, res){
        // Get all accounts
        res.status(200).json({
            status: 200,
            message: 'All bank accounts have been fetched successfully',
            data: accounts
        });
    }// end of getAllAccounts module

    static createAccount(req, res){
        // Create a Bank Account
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

        if(!newAccount.firstName) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your first name, it is a required field'
            });
        }

        if(!newAccount.lastName) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your last name, it is a required field'
            });
        }

        if(!newAccount.email) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your email, it is a required field'
            });
        }

        if(!newAccount.type) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your account type, it is a required field'
            });
        }

        const validName = /^[A-Za-z]*$/
        const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
            
        if(typeof(newAccount.type) === 'number') {
            return res.status(400).json({ 
                status: 400,
                message: 'Your account type can not be a number'
            });
        }
        
        if(!newAccount.firstName.toString().match(validName)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your first name can only have alphabets in them'
            });
        }

        if(!newAccount.lastName.toString().match(validName)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your last name can only have alphabets in them'
            });
        }

        if(!newAccount.email.toString().match(validEmail)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your email must follow the standard email format eg: test@gmail.com'
            });
        }

        const found = users.some(user => user.email === newAccount.email);

        if(!found) {
        return res.status(404).json({ 
            status: 404,
            message: 'Sorry you do not have a user account yet, please sign up and return to this page'
        });
        } else {
        let owner = users.filter(user => user.email === newAccount.email) 
        newAccount.owner = owner[0].id;
        }

        if(newAccount.type !== 'savings') {
            if(newAccount.type !== 'current') {
                return res.status(400).json({ 
                    status: 400,
                    message: 'Sorry your account type can be either savings or current.'
                })
            }
        }

        accounts.push(newAccount);
        res.status(201).json({
            status: 201,
            message: 'Your bank account has been created successfully',
            data: newAccount
        });
    }// end of createAccount module

    static accountActivateDeactivate(req, res){
        // Admin or staff can activate or deactivate a bank account
        const userDetails = {
            email : req.body.email,
            password : req.body.password
        }

        if(!userDetails.email) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please input your email'
            });
        }

        if(!userDetails.password) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please input your password'
            });
        }

        const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
        const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        
        if(typeof(userDetails.email) === 'number') {
            return res.status(400).json({ 
                status: 400,
                message: 'Your email can not be a number.'
            });
        }

        if(typeof(userDetails.password) === 'number') {
            return res.status(400).json({ 
                status: 400,
                message: 'Your password can not be a number.'
            });
        }

        if(!userDetails.email.match(validEmail)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your email must follow the standard email format eg: test@gmail.com'
            });
        }

        if(!userDetails.password.match(validPassword)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your password should have at least one upper case English letter,one lower case English letter, one digit, one special character and a Minimum eight characters'
            });
        }

        const isAuthrized = users.some(user => user.email === userDetails.email && user.password === userDetails.password && user.type === 'staff');

        if(!isAuthrized) {
            return res.status(401).json({ 
                status: 401,
                message: 'You are not authorized to perform this activity'
            });
        }
        

        const found = accounts.some(account => account.accountNumber === parseInt(req.params.accountNumber));
        if(found) {
            const updAccount = req.body;  
            accounts.forEach(account => {
                if (account.accountNumber === parseInt(req.params.accountNumber)) {

                    if(updAccount.status !== 'active') {
                        if(updAccount.status !== 'dormant') {
                            return res.status(400).json({ 
                                status: 400,
                                message: 'Sorry you can only set status to active or dormant.'
                            });
                        }
                    }
                    account.status = updAccount.status ? updAccount.status : account.status;
                    res.status(200).json({
                        status: 200, 
                        message: `Account with number ${req.params.accountNumber} has been made ${updAccount.status}`,
                        data: account
                    });
                }
            });
        } else {
            res.status(404).json({ 
                status: 404,
                message: `Account number: ${req.params.accountNumber} does not exist`
            });
        }
    }// end of accountActivateDeactivate module

    static deleteAccount(req, res){
        //Admin or staff can delete a bank account
        const userDetails = {
            email : req.body.email,
            password : req.body.password
        }

        if(!userDetails.email) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please input your email'
            });
        }

        if(!userDetails.password) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please input your password'
            });
        }

        const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
        const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

        if(!userDetails.email.toString().match(validEmail)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your email must follow the standard email format eg: test@gmail.com'
            });
        }

        if(!userDetails.password.toString().match(validPassword)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your password should have at least one upper case English letter,one lower case English letter, one digit, one special character and a Minimum eight characters'
            });
        }

        const isAuthrized = users.some(user => user.email === userDetails.email && user.password === userDetails.password && user.type === 'staff');

        if(!isAuthrized) {
            return res.status(401).json({ 
                status: 400,
                message: 'You are not authorized to perform this activity'
            });
        }
        const found = accounts.some(account => account.accountNumber === parseInt(req.params.accountNumber));

        if(found) {
            accounts.forEach(account => {
                if(account.accountNumber === parseInt(req.params.accountNumber)) {
                    const index = accounts.indexOf(account);
                    accounts.splice(index, 1);
                }
            })
            res.status(200).json({
                status: 200,
                message: 'Account successfully deleted',
                data: accounts
            });
        } else {
            res.status(404).json({ 
                status: 404,
                message: `Account with number ${req.params.accountNumber} does not exist`
            });
        }
    }// end of deleteAccount module
}// end of Accounts class


export default Accounts;