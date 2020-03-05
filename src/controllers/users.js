import _ from 'lodash';
import { fetch, fetchById, createUser, fetchAll } from '../database/functions';
import debug from '../helpers/debug';
import { sign } from '../helpers/tokens';
import { hash, compare } from '../helpers/hash';
import { validateRegister, validateLogin } from '../helpers/validations/users';

const Users = {
    async register (req, res) {
        const { error } = validateRegister(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        
        const user = await fetch('users',{ email: req.body.email });
        if (user.error) return debug(user);
        if (user.length !== 0) return res.status(409).send({ message: `User with the email: ${req.body.email} already exists.` });
    
        req.body.type = 'client';
        req.body.password = await hash(req.body.password);
        req.body.createdOn = new Date();

        const addedUser = await createUser(req.body);
        const { id, firstname, lastname, email, type, iscashier, isadmin } = addedUser;
        const payload = {
            id,
            firstName: firstname,
            lastName: lastname,
            email,
            type,
            isCashier: iscashier,
            isAdmin: isadmin
        };

        const token = await sign(payload);

        return res.status(201).send({
          message: 'User account has been created successfully',
          data: payload,
          token
        });
    },

    async getUser(req, res) {
        const { id } = req.user;
        const user = await fetchById('users', id);
        if (user.error) return debug(user);
        if (user.length === 0) return res.status(404).send({ message: 'User profile not found' });
        res.send({ message: 'User fetched successfully', user: _.omit(user[0], 'password' ) });
    },

    async getUsers(req, res) {
        const users = await fetchAll('users');
        if (users.error) return debug(users);
        if (users.length === 0) return res.status(404).send({ message: 'There are no user accounts' });
        const userList = _.dropWhile(users, 'password')
        res.status(200).send({ message: 'All users fetched successfully', userList });
    },

    async login(req, res) {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        
        const user = await fetch('users',{ email: req.body.email });
        if (user.error) return debug(user);
        if (user.length === 0) return res.status(404).send({ message: 'Sorry you do not have an account, please sign up' });
        
        const validPassword = await compare(req.body.password, user[0].password);
        if (!validPassword) return res.status(403).send({ message: 'Invalid email or password' });

        const payload = {
            id: user[0].id,
            firstName: user[0].firstname,
            lastName: user[0].lastname,
            email: user[0].email,
            type: user[0].type,
            isCashier: user[0].iscashier,
            isAdmin: user[0].isadmin
        }
        const token = await sign(payload);
        return res.status(200).send({ message: 'Login successful', payload, token }); 
    },

}

export default Users;
