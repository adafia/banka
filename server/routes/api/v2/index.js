import { Router } from 'express';
import userRoutesDb from './usersDbRoutes';
import accountsRouterDb from './accountsDbRoutes';

const allRoutesDb = Router();
allRoutesDb.use(userRoutesDb);
allRoutesDb.use(accountsRouterDb);


export default allRoutesDb;