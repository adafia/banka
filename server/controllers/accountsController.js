import accounts from '../models/Account';
import users from '../models/Users';

class Accounts {
   static getAllAccounts(req, res){
        // Get all accounts
        res.json(accounts);
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
        return res.status(404).json({ msg: 'You are not signed in or you do not have a user account yet, please sign in or sign up and return to this page'});
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
    }// end of createAccount module

    static accountActivateDeactivate(req, res){
        // Admin or staff can activate or deactivate a bank account
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
    }// end of accountActivateDeactivate module

    static deleteAccount(req, res){
        //Admin or staff can delete a bank account
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
            accounts.forEach(account => {
                if(account.accountNumber === parseInt(req.params.accountNumber)) {
                    const index = accounts.indexOf(account);
                    accounts.splice(index, 1);
                }
            })
            res.status(200).json({
                msg: 'Account deleted',
                data: accounts
            });
        } else {
            res.status(400).json({ msg: `Account with number ${req.params.accountNumber} does not exist`});
        }
    }// end of deleteAccount module
}// end of Accounts class


export default Accounts;