import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import db from '../../models/v2/index';
import checkToken from '../../helpers/checkToken';
import Joi from 'joi';
import userSchema from '../../helpers/userValidation';

const Users = {
    async userSignUp(req, res) {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            type: 'client',
            password: req.body.password,
            created_on: Date.now()
        };
        const result = Joi.validate(user, userSchema);
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
            const payload = {
                last_name: req.body.last_name,
                email: req.body.email
                }
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
    }

}

export default Users;