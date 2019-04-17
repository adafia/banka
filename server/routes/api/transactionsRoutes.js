import { Router } from 'express';
import allTransactions from '../../controllers/transactionsController';

const transactionRoutes = Router();

transactionRoutes.get('/transactions', allTransactions.getAllTransactions);
transactionRoutes.post('/transactions/:accountNumber/credit', allTransactions.accountCredit);
transactionRoutes.post('/transactions/:accountNumber/debit', allTransactions.accountDebit);


export default transactionRoutes;