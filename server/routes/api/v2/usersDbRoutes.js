import { Router } from 'express';
import allUsersDb from '../../../controllers/v2/usersControllerDb';

const usersRouterDb = Router();

usersRouterDb.post('/auth/signup', allUsersDb.userSignUp);

export default usersRouterDb;