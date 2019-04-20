import { Router } from 'express';
import allUsers from '../../../controllers/v1/usersController';

const usersRouter = Router();

usersRouter.get('/users', allUsers.getAllUsers);
usersRouter.post('/auth/signin', allUsers.userSignIn);
usersRouter.post('/auth/signup', allUsers.userSignUp);

export default usersRouter;