import { Router } from 'express';
import checkToken from '../../../helpers/checkToken';
import allAccountsDb from '../../../controllers/v2/accountsControllerDb';

const accountsRouterDb = Router();

accountsRouterDb.post('/accounts', allAccountsDb.createAccount);

export default accountsRouterDb;