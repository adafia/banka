import { Router } from 'express';
import checkToken from '../../../helpers/checkToken';
import allUsersDb from '../../../controllers/v2/usersControllerDb';

const usersRouterDb = Router();

usersRouterDb.get('/users', allUsersDb.getAllUsers);
usersRouterDb.post('/auth/signup', allUsersDb.userSignUp);
usersRouterDb.post('/auth/signin', allUsersDb.userSignIn);

export default usersRouterDb;