import { Router } from 'express';
import transactions from '../controllers/transactions';
import auth from '../middleware/auth';
import isCashier from '../middleware/isCashier';
import isAdmin from '../middleware/isAdmin';

const router = Router();

router.get('/transactions', [auth, isAdmin], transactions.getTransactions);
router.post('/transactions/:accountNumber/credit', [auth, isCashier], transactions.credit);
router.post('/transactions/:accountNumber/debit', [auth, isCashier], transactions.debit);
router.get('/accounts/:accountNumber/transactions', auth, transactions.transactionHistory);
router.get('/transactions/:id', auth, transactions.getTransaction);

export default router;
