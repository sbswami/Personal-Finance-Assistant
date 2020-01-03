/**
 * Users Routes
 * @module routes/users
 */

/**
 * @namespace userRoutes
 */

/**
 * Requiring Route Controller
 * @constant
 */
const userController = require('../controller/index');

/**
 * Requiring Express
 * @constant
 */
const express = require('express');

/**
 * Getting Router from Express
 * @constant
 */
const router = express.Router();

/**
 * Requiring Passport
 * @constant
 */
const passport = require('passport');

/**
 * Root Address of USERS
 * @name get
 * @method
 * @inner
 * @param {String} path - /
 * @param {Callback} callback - With Parameters: Request, Response, Next
 */
router.get('/', function (req, res, next) {
  /// Response back to the request user
  res.send('List of Users...');
});

/**
 * Create User POST URL
 * @name post
 * @method
 * @inner
 * @param {String} path - /create
 * @param {Callback} callback - createUser function From Conroller
 */
router.post('/create', userController.createUser);

/**
 * Read Loged In User Information
 * @name get
 * @method
 * @inner
 * @param {String} path - /read
 * @param {Function} middleware - Passport Authentication Middleware
 * @param {Callback} callback - readUser function From Conroller
 */
router.get(
  '/read',
  /**
   * Passport Authentication Middleware
   * @name authenticate
   * @method
   * @inner
   * @param {String} Stratagy - jwt
   * @param {Object} Option - Session False
   */
  passport.authenticate('jwt', { session: false }),
  userController.readUser,
);

/**
 * Read Loged In User Information
 * @name post
 * @method
 * @inner
 * @param {String} path - /search
 * @param {Callback} callback - searchUser function From Conroller
 */
router.post(
  '/search',
  userController.searchUser,
);

/**
 * Update User
 * @name put
 * @method
 * @inner
 * @param {String} Path - /udate/:id | Update Path with Param `ID`
 * @param {Function} middleware - Passport Authentication Middleware
 * @param {Callback} callback - searchUser function From Conroller
 */
router.put(
  '/update/:id',
  /**
   * Passport Authentication Middleware
   * @name authenticate
   * @method
   * @inner
   * @param {String} Stratagy - jwt
   * @param {Object} Option - Session False
   */
  // passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

/**
 * Delete User
 * @name delete
 * @method
 * @inner
 * @param {String} Path - /delete/:id | Delete User Path with Param `ID`
 * @param {Function} middleware - Passport Authentication Middleware
 * @param {Callback} callback - searchUser function From Conroller
 */
router.delete(
  '/delete/:id',
  /**
   * Passport Authentication Middleware
   * @name authenticate
   * @method
   * @inner
   * @param {String} Stratagy - jwt
   * @param {Object} Option - Session False
   */
  // passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);

/**
 * Login User
 * @name post
 * @method
 * @inner
 * @param {String} Path - /login
 * @param {Function} middleware - Passport Authentication Middleware
 * @param {Callback} callback - loginUser function From Conroller
 */
router.post(
  '/login',
  /**
   * Passport Authentication Middleware
   * @name authenticate
   * @method
   * @inner
   * @param {String} Stratagy - local
   */
  passport.authenticate('local'),
  userController.loginUser,
);

/**
 * Google Authentication
 * @name get
 * @method
 * @inner
 * @param {String} Path - /auth/google
 * @param {Function} middleware - Passport Authentication Middleware
 */
router.get(
  '/auth/google',
  /**
   * Passport Authentication Middleware
   * @name authenticate
   * @method
   * @inner
   * @param {String} Stratagy - google
   * @param {Object} Option - Scope List: Information of user we want to access 
   */
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]
  }),
);

/**
 * Google Authentication Response
 * @name get
 * @method
 * @inner
 * @param {String} Path - /google/response
 * @param {Function} middleware - Passport Authentication Middleware
 * @param {Callback} callback - 
 */
router.get(
  '/google/response',
  /**
   * Passport Authentication Middleware
   * @name authenticate
   * @method
   * @inner
   * @param {String} Stratagy - google
   * @param {Object} Option - Failure and Success Redirect
   */
  passport.authenticate(
    'google',
    {
      failureRedirect: process.env.GOOGLE_FAILURE_REDIRECT,
      successRedirect: process.env.GOOGLE_SUCCESS_REDIRECT,
    },
  ),
  function (req, res) {
    res.send('INSIDE THE THING');
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
module.exports = router;
