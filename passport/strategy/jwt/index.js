/**
 * JWT Strategy
 * @module strategy/jwt
 */

/**
 * @namespace jwtStrategy
 */

/**
 * Requiring JWT Strategy from passport-jwt lib
 * @const
 */
const JWTStrategy = require('passport-jwt').Strategy;
require('dotenv').config();

/**
 * Function which returns the JWT
 * @constant
 */
const ExtractJWT = require('passport-jwt').ExtractJwt;

/**
 * @typedef {Object} options
 * @property {function} ExtractJWT - Function which returns JWT
 * @property {string} secretOrKey - JWT secret
 */
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET,
};

/**
 * Requiring passport
 * @const
 */
const passport = require('passport');

/**
 * Requiring User Schema
 * @const
 */
const { User } = require('../../../schema/index');

/**
 * Adding JWT Strategy
 * @name use
 * @function
 * @memberof module:strategy/jwt~jwtStrategy
 * @inner
 * @param {Object} JWTStrategyOptions - JWT Strategy Options
 */
passport.use(
  new JWTStrategy(options,
    /**
     * Callback Function
     * @function
     * @inner
     * @param {object} jwtPayload - Decrypted JWT payload
     * @param {callback} done - Next function
     */
    async function (jwtPayload, done) {
      await User.findById({ _id: jwtPayload.id })
        .then(user => {
          if (user)
            return done(null, user);
          return done(null, false);
        })
        .catch(err => done(err));
    })
);
