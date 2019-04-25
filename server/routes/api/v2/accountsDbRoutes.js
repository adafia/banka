import { Router } from 'express';
import checkToken from '../../../helpers/checkToken';
import allAccountsDb from '../../../controllers/v2/accountsControllerDb';

const accountsRouterDb = Router();

accountsRouterDb.get('/accounts', checkToken, allAccountsDb.getAllaccounts);
accountsRouterDb.post('/accounts', checkToken, allAccountsDb.createAccount);
accountsRouterDb.patch('/accounts/:accountNumber', checkToken, allAccountsDb.accountActivateDeactivate);
accountsRouterDb.delete('/accounts/:accountNumber', checkToken, allAccountsDb.deleteAccount);
accountsRouterDb.get('/accounts/:accountNumber', checkToken, allAccountsDb.userViewAccount);

export default accountsRouterDb;