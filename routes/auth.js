const express = require('express');
const passport = require('passport');
// const mongoose = require('mongoose');
// const User = mongoose.model('Users');

const loginRouter = express.Router();
const router = express.Router();

loginRouter.get('/', (req, res) => {
    res.json({response:'Youre on login page'})
})

async function login(req, user) {
    console.log('login func')
    console.log(user)
    await new Promise ((resolve, reject) => {
        req.login(user, (err) => {
            if (err) {
                reject(err);
            }else {
                resolve(user);
            }
        });
    });
}

loginRouter.post('/', (req, res, next) => {     
    passport.authenticate('local', async(err, user) => {
        console.log(user)
        if (err) {
            console.log('error')
            res.json(err);
            return next(err);
        }
        if (user) {
            console.log('user !== false')
            await login(req, user);
            return res.json(user)
        }

        res.json({error:'User or password is wrong'})
        
    })(req, res, next);
});

router.use('/login', loginRouter);

router.get('/logout', (req, res) => {
    req.logout();
    res.json({user:'user is logged out'})
})

module.exports = router