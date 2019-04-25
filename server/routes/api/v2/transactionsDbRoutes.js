import { Router } from 'express';
import checkToken from '../../../helpers/checkToken';
import allTransactionsDb from '../../../controllers/v2/transactionsControllerDb';

const transactionRoutesDb = Router();

transactionRoutesDb.get('/transactions', checkToken, allTransactionsDb.getAllTransactions);
transactionRoutesDb.post('/transactions/:accountNumber/credit', checkToken, allTransactionsDb.accountCredit);
transactionRoutesDb.post('/transactions/:accountNumber/debit', checkToken, allTransactionsDb.accountDebit);
transactionRoutesDb.get('/accounts/:accountNumber/transactions', checkToken, allTransactionsDb.getTransactionHistory);
transactionRoutesDb.get('/transactions/:id', checkToken, allTransactionsDb.viewSpecificTransaction);


export default transactionRoutesDb;