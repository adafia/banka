import { Router } from 'express';
import checkToken from '../../../helpers/checkToken';
import allAccountsDb from '../../../controllers/v2/accountsControllerDb';

const accountsRouterDb = Router();

accountsRouterDb.get('/accounts', allAccountsDb.getAllaccounts);
accountsRouterDb.post('/accounts', allAccountsDb.createAccount);
accountsRouterDb.patch('/accounts/:accountNumber', allAccountsDb.accountActivateDeactivate);
accountsRouterDb.delete('/accounts/:accountNumber', allAccountsDb.deleteAccount);

export default accountsRouterDb;