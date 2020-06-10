require('dotenv').config({path: './.env'});

const cookieParser = require('cookie-parser');
const creatError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const { Strategy } = require('passport-local');
const flash = require('flash');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/auth');
const registerRouter = require('./routes/register');



const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// initilize mongodb connection
mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('Something went wrong: ' + err)
})
require('./models/user');


require('./config/passport-config');

app.use(cookieSession({
    secret: 'replace me in production'
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/auth', authRouter);
app.use('/auth', registerRouter);

app.listen(process.env.PORT, ()=> {
    console.log('Server is listening on PORT: ' + process.env.PORT)
})


