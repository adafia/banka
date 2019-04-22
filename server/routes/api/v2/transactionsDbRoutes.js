import { Router } from 'express';
import checkToken from '../../../helpers/checkToken';
import allTransactionsDb from '../../../controllers/v2/transactionsControllerDb';

const transactionRoutesDb = Router();

transactionRoutesDb.get('/transactions', allTransactionsDb.getAllTransactions);
transactionRoutesDb.post('/transactions/:accountNumber/credit', allTransactionsDb.accountCredit);
transactionRoutesDb.post('/transactions/:accountNumber/debit', allTransactionsDb.accountDebit);
transactionRoutesDb.get('/accounts/:accountNumber/transactions', allTransactionsDb.getAccountTransactions);


export default transactionRoutesDb;