import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import users from '../../models/v1/Users';

class Users {
    static getAllUsers(req, res){
        // Get all users
        res.status(200).json({
            status: 200,
            message: 'All users have been fetched successfully',
            data: users
        });
    }

    static userSignIn(req, res, next){
        //Sign in a user
        const userDetails = {
            email : req.body.email,
            password : req.body.password
        }

        if(!userDetails.email) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please input your email'});
        }

        if(!userDetails.password) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please input your password'});
        }

        const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
        const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        // At least one upper case English letter, (?=.*?[A-Z])
        // At least one lower case English letter, (?=.*?[a-z])
        // At least one digit, (?=.*?[0-9])
        // At least one special character, (?=.*?[#?!@$%^&*-])
        // Minimum eight in length .{8,} (with the anchors)

        if(!userDetails.email.toString().match(validEmail)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your email must follow the standard email format eg: test@gmail.com'});
        }

        if(!userDetails.password.toString().match(validPassword)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your password should have at least one upper case English letter,one lower case English letter, one digit, one special character and a Minimum eight characters'});
        }

        const found = users.some(user => user.email === userDetails.email && user.password === userDetails.password);

        if(found) {
            let user = users.filter(user => user.email === userDetails.email)[0];
            jwt.sign(user, process.env.SECRET_OR_KEY, { expiresIn: '1h' }, (err, token) => {
                res.status(200).json({
                    status: 200,
                    token: token,
                    message: 'You have logged in successfully',
                    data: user
                });
            });
            // res.status(200).json(user);
        } else {
            res.status(400).json({ message: 'Your password does not much your account details provided. Please input the right email and password'});
        }
       
    }

    static userSignUp(req, res){
        //Sign up an user 
        const newUser = {
            id : users.length + 1 ,
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : req.body.password,
            type : 'client' , // client or staff
            isAdmin : false , // must be a staff user account
            createdOn : new Date()
        }

        if(!newUser.email) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your email, it is required'});
        }

        if(!newUser.firstName) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your first name, it is required'});
        }
        if(!newUser.lastName) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your last name, it is required'});
        }
        if(!newUser.password) {
            return res.status(400).json({ 
                status: 400,
                message: 'Please fill out your password, it is required'});
        }
        const validName = /^[A-Za-z]*$/
        const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
        const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

        if(!newUser.firstName.toString().match(validName)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your first name can not be a number, please input alphabets only'});
        }

        if(!newUser.lastName.toString().match(validName)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your last name can not be a number, please input alphabets only'});
        }
        
        if(!newUser.email.toString().match(validEmail)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your email must follow the standard email format eg: test@gmail.com'});
        }

        if(!newUser.password.toString().match(validPassword)) {
            return res.status(400).json({ 
                status: 400,
                message: 'Your password should have at least one upper case English letter,one lower case English letter, one digit, one special character and a Minimum eight characters'});
        }

        const found = users.some(user => user.email === newUser.email);

        if (found) {
            return res.status(409).json({ 
                status: 409,
                message: `Sorry email: ${newUser.email} is already in use`})
        }

        users.push(newUser);
        jwt.sign(newUser, process.env.SECRET_OR_KEY, { expiresIn: '1h' }, (err, token) => {
            res.status(201).json({
                status: 201,
                token: token, 
                message: 'User account has been created successfully',
                data : newUser});
        });
        

    }
}

export default Users;