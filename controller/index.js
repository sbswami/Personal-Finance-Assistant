/** Route Controllers
 * @module controller/index
 */

/**
* @namespace routeController
*/

/**
 * Requiring User Schema
 * @const
 */
const { User } = require('../schema/index');

/**
 * Requiring jsonwebtoken Library to ganerate auth token
 * @const
 */
const jwt = require('jsonwebtoken');

/**
 * Requiring bcryptjs to Hash Password
 * @const
 */
const bcrypt = require('bcryptjs');

/**
 * Requiring http-status-codes
 * @const - Constains Status code object Names with codes
 */
const HttpStatus = require('http-status-codes');

/**
 * Loading environment variables
 */
require('dotenv').config();

/**
 * Create User
 * @exports
 * @name createUser
 * @function
 * @memberof module:controller/index~routeController
 * @inner
 * @param {Object} req - Http Request object | Grab data from user
 * @param {Object} res - Http Response object | Response to User
 */
module.exports.createUser = (req, res) => {
  /**
   * @typedef {Object} newUser
   * @property {String} fullName Name of User | Grab from request body
   * @property {Date} dob User Date of Birthday
   * @property {String} businessName Name of User business
   * @property {String} phone User phone number
   * @property {String} email User Mail
   * @property {String} password
   */
  const newUser = new User({
    fullName: req.body.fullName,
    dob: req.body.dob,
    businessName: req.body.businessName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });

  /**
   * Generate Salt
   * @name genSalt
   * @function
   * @inner
   * @param {Number} rounds - Hash rounds to generate Salt
   * @param {callback} callback - Process the salt value
   * @inner
   * @param {Error} error - error in Generate salt
   * @param {string | number} salt - Salt value Generated 
   */
  bcrypt.genSalt(10, (err, salt) => {
    /**
     * Raw password to Hash password
     * @name hash
     * @function
     * @inner
     * @param {String} password - Password to hash
     * @param {string | number} salt - Salt value by bcrypt
     * @param {callback} callback - Getting hash Value
     * @inner
     * @param {Error} err - Error while generate hash
     * @param {String} hash - Hash value for password to store in DB
     * @throws Error
     */
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      /// Throw error
      if (err) throw err;
      /// Assign Hash value of Password to New User object password
      newUser.password = hash;
      /**
       * Save User to DB
       * @returns Promise
       */
      newUser.save()
        /**
         * Send Response with Status 200 and User Data
         */
        .then(user => res.status(HttpStatus.OK).json({ user }))
        /**
         * Send Bad Request Rersponse with Error
         */
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
    });
  });
}

/**
 * Read User Detail
 * @exports
 * @name readUser
 * @function
 * @memberof module:controller/index~routeController
 * @inner
 * @param {Object} req - Http Request object | Grab data from user
 * @param {Object} res - Http Response object | Response to User
 */
module.exports.readUser = (req, res) => {
  /**
   * Response User with status code 200
   * req.user is from passport middleware | grabed from JWT
   */
  res.status(HttpStatus.OK).json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      dob: req.user.dob,
      businessName: req.user.businessName,
      phone: req.user.phone,
      email: req.user.email,
    }
  });
};

/**
 * Search User Name
 * @exports
 * @name searchUser
 * @function
 * @memberof module:controller/index~routeController
 * @inner
 * @param {Object} req - Http Request object | Grab data from user
 * @param {Object} res - Http Response object | Response to User
 */
module.exports.searchUser = (req, res) => {
  /**
   * Find By Name Contains Static Method
   * @name findByNameContains
   * @function
   * @inner
   * @param {String} Name - Name that to be searched
   * @param {callback} callback - Callback Function with two parameters `Error` and `Data`
   */
  User.findByNameContains(req.body.name, (err, data) => {

    /**
     * If Error occurs while data fetching send response with status code 400
     * @return - Exit function with Response Message `Not Found` if Error
     */
    if (err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Not Found' });
    /**
     * Response With status code 200
     * Data: List of users that constains name
     */
    res.status(HttpStatus.OK).json({ data });
  });
}

/**
 * Update User By User ID
 * @exports
 * @name updateUser
 * @function
 * @memberof module:controller/index~routeController
 * @inner
 * @param {Object} req - Http Request object | Grab data from user
 * @param {Object} res - Http Response object | Response to User
 */
module.exports.updateUser = (req, res) => {

  /**
   * Find By ID and Update User
   * @name findByIdAndUpdate
   * @function
   * @inner
   * @param {String} id - ID of User
   * @param {Object} userObject - New user objct with only inforamtion that needs to be update
   * @param {callback} callback - Callback Function with two parameters `Error` and `Updated User`
   */
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {

    /**
     * If Error occurs while data Updating send response with status code 400
     * @return - Exit function with Response Message `Cannot update the user` if Error
     */
    if (err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Cannot update the user' });

    /**
     * Response With status code 200
     * User - After update
     */
    res.status(HttpStatus.OK).json({ user });
  });
};

/**
 * Delete User
 * @exports
 * @name deleteUser
 * @function
 * @memberof module:controller/index~routeController
 * @inner
 * @param {Object} req - Http Request object | Grab data from user
 * @param {Object} res - Http Response object | Response to User
 */
module.exports.deleteUser = (req, res) => {

  /**
   * Find By ID and Delete User
   * @name findByIdAndRemove
   * @function
   * @inner
   * @param {String} id - ID of User
   * @param {callback} callback - Callback Function with two parameters `Error`
   */
  User.findByIdAndRemove(req.params.id, err => {

    /**
     * If Error occurs while data Updating send response with status code 403
     * @return - Exit function with Response Message `Request cannot be Processed!` if Error
     */
    if (err)
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Request cannot be Processed!' });
    
    /**
     * Response With status code 200
     * Message - User Removed!
     */
    res.status(HttpStatus.OK).json({ message: 'User Removed!' });
  });
};


/**
 * Login User
 * @exports
 * @name loginUser
 * @function
 * @memberof module:controller/index~routeController
 * @inner
 * @param {Object} req - Http Request object | Grab data from user
 * @param {Object} res - Http Response object | Response to User
 */
module.exports.loginUser = (req, res) => {
  /**
   * @const token - JWT Token 
   * @name jwt.sign
   * @function
   * @inner 
   * @param {Object} payload - User Id in the payload object | req.user from passport midleware
   * @param {String} Secret - JWT Secret Key from Enviroment Variable
   */
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  /**
   * Response with status code 200
   * token - User token to save in localstorage
   */
  res.status(HttpStatus.OK).json({ token });
};
