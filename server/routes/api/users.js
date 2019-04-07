const express = require('express');
const uuid = require('uuid');
const usersRouter = express.Router();
const users = require('../../models/Users');

// Get all users
usersRouter.get('/', (req, res) => res.json(users));

//Sign in a user
usersRouter.post('/', (req, res) => {
    const userDetails = {
        email : req.body.email,
        password : req.body.password
    }

    const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
    const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    // At least one upper case English letter, (?=.*?[A-Z])
    // At least one lower case English letter, (?=.*?[a-z])
    // At least one digit, (?=.*?[0-9])
    // At least one special character, (?=.*?[#?!@$%^&*-])
    // Minimum eight in length .{8,} (with the anchors)
    
    if(typeof(userDetails.email) === 'number' || typeof(userDetails.password) === 'number') {
        return res.status(400).json({ msg: 'Your email or password can not contain numbers only.'});
    }

    if(!userDetails.email.match(validEmail) || !userDetails.password.match(validPassword)) {
        return res.status(400).json({ msg: 'Your email must follow the standard email format and your password should have at least one upper case English letter,one lower case English letter, one digit, one special character and a Minimum eight characters'});
    }

    const found = users.some(user => user.email === userDetails.email && user.password === userDetails.password);

    if(found) {
        res.json(users.filter(user => user.email === userDetails.email));
    } else {
        res.status(400).json({ msg: 'Your account details are wrong. Please input the right email and password'});
    }
});

//Sign up an user 
usersRouter.post('/user', (req, res) => {
    const newUser = {
        id : uuid.v4() ,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password,
        type : 'client' , // client or staff
        isAdmin : false , // must be a staff user account
        createdOn : new Date()
    }

    if(!newUser.email || !newUser.firstName || !newUser.lastName || !newUser.password) {
        return res.status(400).json({ msg: 'Please fill in all required inputs of the form'});
    }
    const validName = /^[A-Za-z]*$/
    const validEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
    const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    
    if(typeof(newUser.firstName) === 'number' || typeof(newUser.lastName) === 'number') {
        return res.status(400).json({ msg: 'Your first name or last name can not be numbers, please input alphabets only'});
    }

    if(!newUser.firstName.match(validName) || !newUser.lastName.match(validName) || !newUser.email.match(validEmail) || !newUser.password.match(validPassword)) {
        return res.status(400).json({ msg: 'All or at least one of your inputs are invalid, please provide the appropriate characters for each input field'});
    }

    const found = users.some(user => user.email === newUser.email);

    if (found) {
        return res.status(409).json({ msg: `Sorry email: ${newUser.email} is already in use`})
    }

    users.push(newUser);
    res.send(users);
});



module.exports = usersRouter;