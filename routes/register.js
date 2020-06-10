const express = require('express');
const { promisify } = require('util');
const passport = require('passport');

const router = express.Router();
// const mongoose = require('mongoose');
// const User = mongoose.model('users'); 
const User = require('../models/user');


router.post('/register', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    const errors = {};
    const user = await User.findOne({email: email});

    if (user !== null) {
        errors.email = 'email already exists.';
        
        res.json(errors);
    }
    else {
        
        const newUser = new User({
            username: username,
            email: email,
        })
        await newUser.setPassword(password);

        const user = await newUser.save();
        // await promisify(passport.authenticate('local'))(req, res);
        console.log(user)
        res.json(user)
        console.log('new User added')
    }
        
    
})

module.exports = router;