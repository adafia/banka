import { Router } from 'express';
import allTransactions from '../../controllers/transactionsController';

const transactionRoutes = Router();

transactionRoutes.get('/transactions', allTransactions.getAllTransactions);
transactionRoutes.post('/transactions', allTransactions.accountCreditDebit);


export default transactionRoutes;