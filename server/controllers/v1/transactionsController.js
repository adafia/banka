import transactions from '../../models/v1/Transactions';
import users from '../../models/v1/Users';
import accounts from '../../models/v1/Account';

class Transactions {
    static getAllTransactions(req, res) {
        res.status(200).json({
            status: 200, 
            message: 'All transactions have been fetched successfully',
            data: transactions
        });
    }

    static accountCredit(req, res) {
        const newTransaction = {
            id : transactions.length + 1,
            createdOn : new Date(),
            type : 'credit', // credit or debit
            accountNumber : parseInt(req.params.accountNumber),
            cashier : req.body.cashier, // cashier who consummated the transaction
            amount : req.body.amount,
            newBalance : 0
        }

        if(typeof(newTransaction.cashier) !== 'number') {
            return res.status(400).json({ 
                status: 400,
                message: 'Sorry you can only input numbers in the Cashier id field'
            });
        }

        if(typeof(newTransaction.amount) !== 'number') {
            return res.status(400).json({ 
                status: 400,
                message: 'Sorry you can only input numbers in the Amount field'
            });
        }

        const isUser = users.some(user => user.id === newTransaction.cashier);
        if(!isUser){
            return res.status(404).json({ 
                status: 404,
                message: `Cashier with id: ${req.body.cashier} does not exist`
            });
        }

        const user = users.filter(user => user.id === newTransaction.cashier);
        if(user[0].type !== 'staff'){
            return res.status(401).json({ 
                status: 401,
                message: 'You are not Authorized to perform this activity'
            });
        }

        const isAccount = accounts.some(account => account.accountNumber === newTransaction.accountNumber);
        if(!isAccount){
            return res.status(404).json({ 
                status: 404,
                message: `Account with number: ${newTransaction.accountNumber} does not exist`
            });
        }
        
        const account = accounts.filter(account => account.accountNumber === newTransaction.accountNumber);
        newTransaction.newBalance = account[0].balance + newTransaction.amount;
            account[0].balance = newTransaction.newBalance;
            return res.status(200).json({ 
                status: 200,
                message : `Transaction complete, Account number: ${newTransaction.accountNumber} has been credited with ${newTransaction.amount}`,
                data: newTransaction
            });

        }

    static accountDebit(req, res) {
        const newTransaction = {
            id : transactions.length + 1,
            createdOn : new Date(),
            type : 'debit', // credit or debit
            accountNumber : parseInt(req.params.accountNumber),
            cashier : req.body.cashier, // cashier who consummated the transaction
            amount : req.body.amount,
            newBalance : 0
        }

        if(typeof(newTransaction.cashier) !== 'number') {
            return res.status(400).json({ 
                status: 400,
                message: 'Sorry you can only input numbers in the Cashier id field'
            });
        }

        if(typeof(newTransaction.amount) !== 'number') {
            return res.status(400).json({ 
                status: 400,
                message: 'Sorry you can only input numbers in the Amount field'
            });
        }

        const isUser = users.some(user => user.id === newTransaction.cashier);
        if(!isUser){
            return res.status(404).json({ 
                status: 404,
                message: `Cashier with id: ${req.body.cashier} does not exist`
            });
        }

        const user = users.filter(user => user.id === newTransaction.cashier);
        if(user[0].type !== 'staff'){
            return res.status(401).json({ 
                status: 401,
                message: 'You are not Authorized to perform this activity'
            });
        }

        const isAccount = accounts.some(account => account.accountNumber === newTransaction.accountNumber);
        if(!isAccount){
            return res.status(404).json({ 
                status: 404,
                message: `Account with number: ${newTransaction.accountNumber} does not exist`
            });
        }
        
        const account = accounts.filter(account => account.accountNumber === newTransaction.accountNumber);
        let sufficientFunds = account[0].balance > newTransaction.amount;
        if (sufficientFunds){
            newTransaction.newBalance = account[0].balance - newTransaction.amount;
            account[0].balance = newTransaction.newBalance;
            return res.status(200).json({ 
                status: 200,
                message : `Transaction complete, Account number: ${newTransaction.accountNumber} has been debited with ${newTransaction.amount}`,
                data: newTransaction
            });
        }

        if(!sufficientFunds){
            res.status(405).json({ 
                status: 405,
                message : `Sorry account with number: ${newTransaction.accountNumber} has insufficient funds for this transaction`
            });
        }

        }
        
        

    }


export default Transactions;