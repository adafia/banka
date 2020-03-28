import { Router } from 'express';
import users from './users';
import accounts from './accounts';
import transactions from './transactions';
import admin from './admin';

const routers = Router();
routers.use(users);
routers.use(accounts);
routers.use(transactions);
routers.use(admin);

export default routers;
