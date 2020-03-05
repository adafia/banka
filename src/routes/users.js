import { Router } from 'express';
import users from '../controllers/users';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const router = Router();

router.get('/users', [auth, isAdmin], users.getUsers);
router.get('/user', auth, users.getUser);
router.post('/auth/signup', users.register);
router.post('/auth/signin', users.login);

export default router;
