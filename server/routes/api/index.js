import { Router } from 'express';
import userRoutes from './usersRoutes';
import accountRoutes from './accountsRoutes';

const allRoutes = Router();
allRoutes.use(userRoutes);
allRoutes.use(accountRoutes);

export default allRoutes;