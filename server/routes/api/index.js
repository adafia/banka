import { Router } from 'express';
import userRoutes from './usersRoutes';
import accountRoutes from './accountsRoutes';
import transactionRoutes from './transactionsRoutes';

const allRoutes = Router();
allRoutes.use(userRoutes);
allRoutes.use(accountRoutes);
allRoutes.use(transactionRoutes);

export default allRoutes;