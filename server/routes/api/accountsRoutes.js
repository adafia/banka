import { Router } from 'express';
import allAccounts from '../../controllers/accountsController';

const accountsRouter = Router();

accountsRouter.get('/accounts', allAccounts.getAllAccounts);
accountsRouter.post('/accounts', allAccounts.createAccount);
accountsRouter.patch('/accounts/:accountNumber', allAccounts.accountActivateDeactivate);
accountsRouter.delete('/accounts/:accountNumber', allAccounts.deleteAccount);

export default accountsRouter;