const passport = require('passport');
const { Strategy } = require('passport-local');
// const mongoose = require('mongoose');
// const User = mongoose.model('users');
const User = require('../models/user');


passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser')
    User.findById({_id: id}).then((user) => {
        done(null, user)
    })
})

passport.use(new Strategy(
    ((email, password, done) => {
        User.findOne({
            email: email,
        })
        .then((user) => {
            // this condition checks if user was retuned from User.findOne and then checks if user passpord is valid
            if(user !== null && user.validatePassword(password)) {
                console.log('user !== null')
                return done(null, user)
            }
            console.log('user === null')
            return done(null, false)
        })
        .catch(err => {
            console.log('passport-config error: ' + err)
        })
        ;
    }),
));