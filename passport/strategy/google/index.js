/** Google Oauth Strategy
 * @module strategy/google
 */

/**
 * @namespace googleStrategy
 */

/**
 * Requiring GoogleStrategy from passport
 * @const
 */
const GoogleStrategy = require("passport-google-oauth2").Strategy;

/**
 * @typedef {Object} options
 * @property {string} clientID - Google Client Id
 * @property {string} clientSecret - Google Secret
 * @property {string} callback - Google Callback URL
 * @property {Boolean} passReqToCallback - If we want to pass the request to callback
 */
const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
  scope: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

/**
 * Requiring passport
 * @const
 */
const passport = require("passport");

/**
 * Adding Google Strategy
 * @name use
 * @function
 * @memberof module:strategy/google~googleStrategy
 * @inner
 * @param {Object} GoogleStrategyOptions - Google Strategy Options
 */
passport.use(
  'google',
  new GoogleStrategy(
    options,
    /**
     * Callback Function
     * @function
     * @inner
     * @param {object} request - Request Object
     * @param {string} accessToken - Access Token
     * @param {string} profile - User Profile
     * @param {callback} done - Next function
     */
    function(request, accessToken, refreshToken, profile, done) {
      const fullName = profile.displayName;
      const email = profile.emails[0]['value'];
      const user_data = { fullName, email };
      console.log(accessToken, refreshToken, user_data);
      return done(JSON.stringify(user_data));
    }
  )
);
