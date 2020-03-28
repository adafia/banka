import { fetch, fetchById, fetchAll, createTransaction, update } from '../database/functions';
import debug from '../helpers/debug';

const Transactions = {
    async getTransactions(req, res) {
        const transactions = await fetchAll('transactions');
        if (transactions.error) return debug(transactions);
        if (transactions.length === 0) return res.status(404).send({ message: 'There are no transactions' });
        
        res.status(200).send({ message: 'All bank transactions have been fetched successfully', transactions });
    },

    async getTransaction(req, res) {
        const transaction = await fetchById('transactions', parseInt(req.params.id));
        if (transaction.error) return debug(transaction);
        if (transaction.length === 0) return res.status(404).send({ message: `Transaction with id: ${req.params.id} was not found` });
        
        res.status(200).send({ message: `Transaction with id: ${req.params.id} has been fetched successfully` , transaction });
    },

    async debit(req, res) {
        const account = await fetch('accounts', { accountNumber: parseInt(req.params.accountNumber) });
        if (account.error) return debug(account);
        if (account.length === 0) return res.status(404).send({ message: `Bank account with the number: ${req.params.accountNumber} does not exists.` });
        if (account[0].status !== 'active') return res.status(400).send({ message: 'This account is not active' });
        if (account[0].balance <= req.body.amount) return res.status(400).send({ message: 'You have insuffecient funds for this transaction' })
        
        const obj = {
          balance: account[0].balance - req.body.amount,
          accountNumber: account[0].accountnumber
        };
        await update('accounts', obj);

        const newTransaction = {
          accountNumber: account[0].accountnumber,
          cashier: req.user.id,
          owner: account[0].owner,
          type: 'debit',
          amount: req.body.amount,
          oldBalance: account[0].balance,
          newBalance: account[0].balance - req.body.amount,
          createdOn: new Date()
        };
        const transaction = await createTransaction(newTransaction)
        return res.status(201).send({ message: 'Debit transaction has been created successfully', transaction });
    },

    async credit(req, res) {
        const account = await fetch('accounts', { accountNumber: parseInt(req.params.accountNumber) });
        if (account.error) return debug(account);
        if (account.length === 0) return res.status(404).send({ message: `Bank account with the number: ${req.params.accountNumber} does not exists.` });
        if (account[0].status !== 'active') return res.status(400).send({ message: 'This account is not active' });
        
        const obj = {
          balance: account[0].balance + req.body.amount,
          accountNumber: account[0].accountnumber
        };
        await update('accounts', obj);

        const newTransaction = {
          accountNumber: account[0].accountnumber,
          cashier: req.user.id,
          owner: account[0].owner,
          type: 'credit',
          amount: req.body.amount,
          oldBalance: account[0].balance,
          newBalance: account[0].balance + req.body.amount,
          createdOn: new Date()
        };
        const transaction = await createTransaction(newTransaction)
        return res.status(201).send({ message: 'Credit transaction has been created successfully', transaction });
    },

    async transactionHistory(req, res){
        const { id } = req.user
        const transactions = await fetch('transactions', { owner: id })
        if (transactions.error) return debug(transactions);
        if (transactions.length === 0) return res.status(404).send({ message: 'You do not have any bank accounts yet' });

        return res.status(200).send({
          message: 'Your transaction history has been fetched successfully',
          data: transactions
        });
    },
}

export default Transactions;
