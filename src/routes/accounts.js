import { Router } from 'express';
import accounts from '../controllers/accounts';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const router = Router();

router.get('/accounts', [auth, isAdmin], accounts.getAccounts);
router.get('/admin/accounts/:status', [auth, isAdmin], accounts.getAccountsByStatus);
router.post('/accounts', auth, accounts.create);
router.patch('/accounts/:accountNumber', [auth, isAdmin], accounts.changeStatus);
router.delete('/accounts/:accountNumber', [auth, isAdmin], accounts.deleteAccount);
router.get('/user/accounts', auth, accounts.userAccounts);
router.get('/accounts/:accountNumber', auth, accounts.userAccount);

export default router;
