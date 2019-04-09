import { Router } from 'express';
import allUsers from '../../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/users', allUsers.getAllUsers);
usersRouter.post('/users', allUsers.userSignIn);
usersRouter.post('/users/user', allUsers.userSignUp);

export default usersRouter;