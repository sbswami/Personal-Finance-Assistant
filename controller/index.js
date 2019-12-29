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
   * @property {string} fullName Name of User | Grab from request body
   * @property {Date} dob User Date of Birthday
   * @property {string} businessName Name of User business
   * @property {string} phone User phone number
   * @property {string} email User Mail
   * @property {string} password
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
   * @param {number} rounds - Hash rounds to generate Salt
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
     * @param {string} password - Password to hash
     * @param {string | number} salt - Salt value by bcrypt
     * @param {callback} callback - Getting hash Value
     * @inner
     * @param {Error} err - Error while generate hash
     * @param {string} hash - Hash value for password to store in DB
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
       * Send 
       */
        .then(user => res.status(HttpStatus.OK).json({ user }))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
    });
  });
}

/**
 * Read User Detail
 * @name readUser
 * @function
 * @memberof module:controller/index~routeController
 * @inner
 * @param {Object} req - Http Request object | Grab data from user
 * @param {Object} res - Http Response object | Response to User
 */
module.exports.readUser = (req, res) => {
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

module.exports.searchUser = (req, res) => {
  console.log(req.body);
  User.findByNameContains(req.body.name, (err, data) => {
    if (err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Not Found' });
    res.status(HttpStatus.OK).json({ data });
  });
}

module.exports.getName = (req, res) => {
  User.findOne({ _id: req.user.id }).exec((err, user) => {
    if (err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "User Not Defined!" });
    res.status(HttpStatus.OK).json(user.getIfAdult());
  });
}

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Cannot update the user' });
    res.status(HttpStatus.OK).json({ user });
  });
};

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err)
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Request cannot be Processed!' });
    res.status(HttpStatus.OK).json({ message: 'User Removed!' });
  });
};

module.exports.loginUser = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.status(HttpStatus.OK).json({ token });
};
