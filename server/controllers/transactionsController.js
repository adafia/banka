import transactions from '../models/Transactions';
import users from '../models/Users';
import accounts from '../models/Account';

class Transactions {
    static getAllTransactions(req, res) {
        res.status(200).json({ 
            message: 'All transactions have been fetched successfully',
            data: transactions});
    }

    static accountCreditDebit(req, res) {
        const newTransaction = {
            id : transactions.length + 1,
            createdOn : new Date(),
            type : req.body.type, // credit or debit
            accountNumber : req.body.accountNumber,
            cashier : req.body.cashier, // cashier who consummated the transaction
            amount : req.body.amount,
            newBalance : 0
        }
        
        if(newTransaction.type !== 'credit'){
            if(newTransaction.type !== 'debit') {
                return res.status(400).json({ message: 'Sorry the transaction type can only be debit or credit'});
            }
        }

        if(typeof(newTransaction.accountNumber) !== 'number') {
            return res.status(400).json({ message: 'Sorry you can only input numbers in the Account number field'});
        }

        if(typeof(newTransaction.cashier) !== 'number') {
            return res.status(400).json({ message: 'Sorry you can only input numbers in the Cashier id field'});
        }

        if(typeof(newTransaction.amount) !== 'number') {
            return res.status(400).json({ message: 'Sorry you can only input numbers in the Amount field'});
        }

        const isUser = users.some(user => user.id === newTransaction.cashier);
        if(!isUser){
            return res.status(404).json({ message: `Cashier with id: ${req.body.cashier} does not exist`});
        }

        const user = users.filter(user => user.id === newTransaction.cashier);
        if(user[0].type !== 'staff'){
            return res.status(401).json({ message: 'You are not Authorized to perform this activity'})
        }

        const isAccount = accounts.some(account => account.accountNumber === newTransaction.accountNumber);
        if(!isAccount){
            return res.status(404).json({ message: `Account with number: ${req.body.accountNumber} does not exist`});
        }
        
        const account = accounts.filter(account => account.accountNumber === newTransaction.accountNumber);
        let sufficientFunds = newTransaction.type === 'debit' && account[0].balance > newTransaction.amount;
        if(newTransaction.type === 'credit'){
            newTransaction.newBalance = account[0].balance + newTransaction.amount;
            account[0].balance = newTransaction.newBalance;
            return res.status(200).json({ 
                message : `Transaction complete, Account number: ${newTransaction.accountNumber} has been credited with ${newTransaction.amount}`,
                data: newTransaction});
        } else if (sufficientFunds){
            newTransaction.newBalance = account[0].balance - newTransaction.amount;
            account[0].balance = newTransaction.newBalance;
            return res.status(200).json({ 
                message : `Transaction complete, Account number: ${newTransaction.accountNumber} has been debited with ${newTransaction.amount}`,
                data: newTransaction});
        }

        if(!sufficientFunds){
            res.status(405).json({ message : `Sorry account with number: ${newTransaction.accountNumber} has insufficient funds for this transaction`})
        }

        }
        
        

    }


export default Transactions;