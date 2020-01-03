/** Express Server
 * @module server/app
 */

/**
 * @namespace appServer
 */

/**
 * Express is a Node.js web application framework
 * @const
 */
const express = require('express');

/**
 * Passport Authentication Middleware
 * @const
 */
const passport = require('passport');

/**
 * CORS is a Node.JS package for providing a Connect/Express middleware that can be used to enable CORS
 * @const
 */
const cors = require('cors');

/**
 * Application Router
 * @const
 */
const indexRouter = require('./routes/index');

/**
 * User Routers
 * @const
 */
const usersRouter = require('./routes/users');

const app = express();


/**
 * Cross Origin Resource Sharing (CORS) allows us to use Web applications within browsers when domains aren't the same
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} cors - Enable cors in our application
 */
app.use(cors());

/// Requiring Mongoose Connection
require('./connection/mongoose');

/**
 * Initializing Passport
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} initialize - Middleware
 */
app.use(passport.initialize());

/**
 * Enable Session for Passport
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} session - Middleware
 */
app.use(passport.session());

/// Requiring JWT Passport Strategy
require('./passport/strategy/jwt/index');

/// Requiring Local Passport Strategy
require('./passport/strategy/local/index');

/// Requiring Google Passport Strategy
require('./passport/strategy/google/index');

/**
 * Serialize User Data into Session
 * @name serializeUser
 * @method
 * @memberof module:server/app~appServer
 * @inner
 * @param {Callback} Function - Paramerter `User` and `Done` Callback
 */
passport.serializeUser(function (user, done) {
  done(null, user);
});

/**
 * Deserialize User Data into Session
 * @name deserializeUser
 * @method
 * @memberof module:server/app~appServer
 * @inner
 * @param {Callback} Function - Paramerter `User` and `Done` Callback
 */
passport.deserializeUser(function (user, done) {
  done(null, user);
});

/**
 * Recognize the incoming Request Object as a JSON Object.
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} json - Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Serving Routes
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {String} root - Root Route
 * @param {Object} indexRouter - Express Router
 */
app.use('/', indexRouter);

/**
 * Serving User Routes
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {String} root - Root Route
 * @param {Object} usersRouter - Express Router
 */
app.use('/users', usersRouter);

module.exports = app;
