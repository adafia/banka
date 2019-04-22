import { Router } from 'express';
import userRoutesDb from './usersDbRoutes';
import accountsRouterDb from './accountsDbRoutes';
import transactionRoutesDb from './transactionsDbRoutes';

const allRoutesDb = Router();
allRoutesDb.use(userRoutesDb);
allRoutesDb.use(accountsRouterDb);
allRoutesDb.use(transactionRoutesDb);


export default allRoutesDb;