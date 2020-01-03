/**
 * Routes
 * @module routes/index
 */

/**
 * @namespace Routes
 */

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
 * Root Address of USERS
 * @name get
 * @method
 * @inner
 * @param {String} path - /
 * @param {Callback} callback - With Parameters: Request, Response, Next
 */
router.get('/', function(req, res, next) {
  res.send('It\'s Working!');
});

/**
 * @exports router
 */
module.exports = router;
