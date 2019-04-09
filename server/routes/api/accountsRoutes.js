import { Router } from 'express';
import allAccounts from '../../controllers/accountsController';

const accountsRouter = Router();

accountsRouter.get('/accounts', allAccounts.getAllAccounts);
accountsRouter.post('/accounts', allAccounts.createAccount);
accountsRouter.patch('/:accountNumber', allAccounts.accountActivateDeactivate);
accountsRouter.delete('/:accountNumber', allAccounts.deleteAccount);

export default accountsRouter;