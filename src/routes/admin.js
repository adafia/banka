import { Router } from 'express';
import admin from '../controllers/admin';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const router = Router();

router.patch('/users/makecashier/:id', [auth, isAdmin], admin.makeCashier);
router.patch('/users/makeadmin/:id', [auth, isAdmin], admin.makeAdmin);

export default router;
