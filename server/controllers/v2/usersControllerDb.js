import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import db from '../../models/v2/index';
import Joi from 'joi';
import signupSchema from '../../helpers/userValidation';
import loginSchema from '../../helpers/loginValidation';
import adminCreateSchema from '../../helpers/adminCreateSchema';
import bcrypt from 'bcrypt';

const Users = {
    async getAllUsers(req, res){
        const fetchAll = 'SELECT * FROM users';
        await db.query(fetchAll).then(users => {
            jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
                if(err){
                    return res.status(403).send({
                        status: 403,
                        message: 'Forbidden access'
                    });
                } else {
                    if(authrizedData.is_admin === true){
                        return res.status(200).send({  
                            number_of_rows: users.rowCount,
                            data: users.rows
                        });
                    } else {
                        return res.status(401).send({
                            status: 401,
                            message: 'You are not authorized to access this information'
                        });
                    }
                }
            });
        }).catch((error) => {
            return res.status(400).send({
                message: error
            });
        })
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
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);

        const found = `SELECT * FROM users WHERE email = $1`;
        await db.query(found, [req.body.email]).then(response =>{
            if(response.rows.length) {
                return res.status(409).send({ 
                    status: 409,
                    message: `Sorry email: ${user.email} is already in use`})
            }
        }).catch(error => {
            res.status(400).send({error})
        });
            

        const text = `INSERT INTO users(first_name, last_name, email, type, password, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [user.first_name, user.last_name, user.email, user.type, hash, user.created_on];
    
        await db.query(text, values).then(userInfo => {
            const payload = { email: req.body.email, type: user.type }
            jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '1d'}, (err, token) => {
                return res.status(201).send({
                    status: 201,
                    message: 'User account has been created successfully',
                    data: {
                        token: token,
                        id: userInfo.rows[0].id,
                        firstName: userInfo.rows[0].first_name, 
                        lastName: userInfo.rows[0].last_name, 
                        email: userInfo.rows[0].email 
                        }
                });
            });
        }).catch(error => {
            return res.status(400).send(error.detail);
        }); 
        
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
        try {
            const found = `SELECT * FROM users WHERE email = $1`;
            await db.query(found, [req.body.email]).then(output => {
                let validPassword = bcrypt.compareSync(req.body.password, output.rows[0].password);
                if(validPassword){
                    let payload = { 
                        email: req.body.email, 
                        type: output.rows[0].type, 
                        is_admin: output.rows[0].is_admin,  
                        is_cashier: output.rows[0].is_cashier 
                    }
                    jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '1d' }, (err, token) => {
                        if(err) res.send(err)
                        return res.status(200).send({
                            status: 200,
                            message: 'You have logged in successfully',
                            data: {
                                token: token,
                                id: output.rows[0].id,
                                firstName: output.rows[0].first_name, 
                                lastName: output.rows[0].last_name, 
                                email: output.rows[0].email 
                                }
                        });
                    });
                } else {
                    return res.status(403).send({
                        status: 403,
                        message: 'Invalid password'
                    });
                }
            }).catch((error) => {
                return res.status(403).send({ 
                    status: 403,
                    message: 'Sorry you do not have an account, please sign up'
                })
            });
        } catch {
            res.send({error})
        }
        
        

    },

    async adminCreateUser(req, res) {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            type: req.body.type,
            is_cashier: req.body.is_cashier,
            is_admin: req.body.is_admin,
            password: req.body.password,
            created_on: Date.now()
        };

        
        const result = Joi.validate(user, adminCreateSchema);
            if (result.error){
                return res.status(400).send({
                    status: 400,
                    message: result.error.details[0].message
                });
            }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);

        let userInfo = '';
        jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
            if(err){
                return res.status(403).send({
                    status: 403,
                    message: 'Forbidden access'
                });
            }
            userInfo = authrizedData;
        });

        if(userInfo.is_admin !== true){
            return res.status(401).send({
                status: 401,
                message: 'You are not authorized'
            });
        }
    
        const found = `SELECT * FROM users WHERE email = $1`;
        const response = await db.query(found, [req.body.email]);
            if(response.rows[0]) {
                return res.status(409).send({ 
                    status: 409,
                    message: `Sorry email: ${user.email} is already in use`})
            }
    
        const text = `INSERT INTO users(first_name, last_name, email, type, is_cashier, is_admin, password, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const values = [user.first_name, user.last_name, user.email, user.type, user.is_cashier, user.is_admin, hash, user.created_on];
        
        try {
            const { rows } = await db.query(text, values);
            const payload = { email: req.body.email, type: user.type , is_cashier: user.is_cashier, is_admin: user.is_admin }
            jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '1d'}, (err, token) => {
                return res.status(201).send({
                    status: 201,
                    message: `${user.type} account has been created successfully`,
                    data: {
                        token: token,
                        id: rows[0].id,
                        firstName: rows[0].first_name, 
                        lastName: rows[0].last_name, 
                        email: rows[0].email,
                        type: rows[0].type, 
                        is_cashier: rows[0].is_cashier, 
                        is_admin: rows[0].is_admin 
                        }
                });
            });
            
        } catch(error) {
            return res.status(400).send(error.detail);
        }
        
    }

}

export default Users;