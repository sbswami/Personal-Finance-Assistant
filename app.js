const express = require('express');
const passport = require('passport');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());

require('./connection/mongoose');
app.use(passport.initialize());
app.use(passport.session());

require('./passport/strategy/jwt/index');
require('./passport/strategy/local/index');
require('./passport/strategy/google/index');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
