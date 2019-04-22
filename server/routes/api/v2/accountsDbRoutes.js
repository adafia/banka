import { Router } from 'express';
import checkToken from '../../../helpers/checkToken';
import allAccountsDb from '../../../controllers/v2/accountsControllerDb';

const accountsRouterDb = Router();

accountsRouterDb.get('/accounts', allAccountsDb.getAllaccounts);
accountsRouterDb.post('/accounts', allAccountsDb.createAccount);
accountsRouterDb.patch('/accounts/:accountNumber', allAccountsDb.accountActivateDeactivate);

export default accountsRouterDb;