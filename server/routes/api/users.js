const express = require('express');
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

    const found = users.some(user => user.email === userDetails.email && user.password === userDetails.password);

    if(found) {
        res.json(users.filter(user => user.email === userDetails.email));
    } else {
        res.status(400).json({ msg: 'Your account details are wrong. Please input the right email and password'});
    }
});



module.exports = usersRouter;