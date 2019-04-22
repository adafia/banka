import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import db from '../../models/v2/index';
import checkToken from '../../helpers/checkToken';
import Joi from 'joi';
import signupSchema from '../../helpers/userValidation';
import loginSchema from '../../helpers/loginValidation';

const Users = {
    async getAllUsers(req, res){
        const fetchAll = 'SELECT * FROM users';
        try {
            const { rows, rowCount } = await db.query(fetchAll);
            return res.status(200).send({ rows, rowCount});
        } catch(error){
            return res.status(400).send(error);
        }
    },

    async userSignUp(req, res) {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            type: 'client',
            password: req.body.password,
            created_on: Date.now()
        };
        const result = Joi.validate(user, signupSchema);
            if (result.error){
                return res.status(400).send({
                    status: 400,
                    message: result.error.details[0].message
                });
            }
        const found = `SELECT * FROM users WHERE email = $1`;
        const response = await db.query(found, [req.body.email]);
            if(response.rows[0]) {
                return res.status(409).send({ 
                    status: 409,
                    message: `Sorry email: ${user.email} is already in use`})
            }

        const text = `INSERT INTO users(first_name, last_name, email, type, password, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [user.first_name, user.last_name, user.email, user.type, user.password, user.created_on];
        
        try {
            const { rows } = await db.query(text, values);
            const payload = { email: req.body.email }
            jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '1h'}, (err, token) => {
                return res.status(201).send({
                    status: 201,
                    token: token,
                    message: 'User account has been created successfully',
                    data: rows[0]
                });
            });
            
        } catch(error) {
            return res.status(400).send(error.detail);
        }
    },

    async userSignIn (req, res) {
        const userDetails = {
            email : req.body.email,
            password : req.body.password
        }

        const result = Joi.validate(userDetails, loginSchema);
            if (result.error){
                return res.status(400).send({
                    status: 400,
                    message: result.error.details[0].message
                });
            }
        const found = `SELECT * FROM users WHERE email = $1`;
        const response = await db.query(found, [req.body.email]);
        if(response.rows[0]) {
            if(response.rows[0].password === req.body.password){
                jwt.sign({ email: req.body.email }, process.env.SECRET_OR_KEY, { expiresIn: '1h' }, (err, token) => {
                    if(err) res.send(err)
                    return res.status(200).send({
                        status: 200,
                        token: token,
                        message: 'You have logged in successfully',
                        data: response.rows[0]
                    });
                });
            } else {
                return res.status(403).send({
                    status: 403,
                    message: 'Invalid password'
                });
            }        
        } else {
            return res.status(403).send({ 
                status: 403,
                message: 'Sorry you do not have an account, please sign up'})
        }

    }

}

export default Users;