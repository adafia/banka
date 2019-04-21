import { Router } from 'express';
import userRoutesDb from './usersDbRoutes';

const allRoutesDb = Router();
allRoutesDb.use(userRoutesDb);


export default allRoutesDb;