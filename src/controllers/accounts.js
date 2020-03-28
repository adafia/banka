import { fetch, fetchById, fetchAll, createAccount, update, remove } from '../database/functions';
import { validaterCreate, validaterChangeStatus } from '../helpers/validations/accounts';
import debug from '../helpers/debug';


const Accounts = {
    async getAccounts(req, res){
        const accounts = await fetchAll('accounts');
        if (accounts.error) return debug(accounts);
        if (accounts.length === 0) return res.status(404).send({ message: 'There are no bank accounts' });
        
        res.status(200).send({ message: 'All bank accounts fetched successfully', accounts });
    },

    async getAccountsByStatus(req, res){
        const accounts = await fetch('accounts', { status: req.params.status });
        if (accounts.error) return debug(accounts);
        if (accounts.length === 0) return res.status(404).send({ message: `There are no ${req.params.status} bank accounts` });
        
        res.status(200).send({ message: `All ${req.params.status} bank accounts have been fetched successfully`, accounts });
    },

    async create(req, res) {
        const { id } = req.user;
        const user = await fetchById('users', id);
        if (user.error) return debug(user);
        if (user.length === 0) return res.status(404).send({ message: 'Sorry, you can only create a bank account if you have a user account' });
        
        const { error } = validaterCreate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const newAccount = {
            accountNumber: Math.floor(Math.random() * 10000),
            firstName: user[0].firstname,
            lastName: user[0].lastname,
            email: user[0].email,
            type: req.body.type,
            status: 'draft',
            balance: 0.0,
            createdOn: new Date(),
            owner: id
        }
        
        const account = await createAccount(newAccount);
        return res.status(201).send({ message: 'Your account has been created successfully', account });

    },

    async changeStatus(req, res) {
        const input = {
            accountNumber: req.params.accountNumber,
            status : req.body.status
        };
        const { error } = validaterChangeStatus(input);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const account = await fetch('accounts', { accountNumber: parseInt(req.params.accountNumber) });
        if (account.error) return debug(account);
        if (account.length === 0) return res.status(404).send({ message: `Bank account with the number: ${req.params.accountNumber} does not exists.` });
        
        const { status } = req.body;
        const obj = {
          status: status,
          accountNumber: account[0].accountnumber
        };
        const updated = await update('accounts', obj);

        return res.status(200).send({
          message: `Bank account with number: ${account[0].accountnumber} has been made ${status}.`,
          account: updated
        });
    },

    async deleteAccount(req, res) {
        const deleted = await remove('accounts', { accountNumber: parseInt(req.params.accountNumber) })
        if (deleted.error) return debug(deleted);
        if (deleted.length === 0) return res.status(404).send({ message: `Bank account with the number: ${req.params.accountNumber} does not exists.` });

         return res.status(200).send({
           message: `Bank account with number: ${deleted[0].accountnumber} has been deleted.`,
           account: deleted
         });
    },

    async userAccounts(req, res){
        const { id } = req.user
        const accounts = await fetch('accounts', { owner: id })
        if (accounts.error) return debug(accounts);
        if (accounts.length === 0) return res.status(404).send({ message: 'You do not have any bank accounts yet' });

        return res.status(200).send({
          message: 'User accounts have been fetched successfully',
          data: accounts
        });
    },

    async userAccount(req, res){
        const account = await fetch('accounts', { accountNumber: parseInt(req.params.accountNumber) });
        if (account.error) return debug(account);
        if (account.length === 0) return res.status(404).send({ message: `Bank account with the number: ${req.params.accountNumber} does not exists.` });
        if (account[0].owner !== req.user.id) return res.status(403).send({ message: 'The account number is not associated with your profile' })
        return res.status(200).send({
          message: 'Your account has been fetched successfully',
          data: account
        });
    },

}

export default Accounts;
