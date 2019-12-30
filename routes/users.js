const userController = require('../controller/index');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
  res.send('List of Users...');
});

router.post('/create', userController.createUser);
router.get(
  '/read',
  passport.authenticate('jwt', { session: false }),
  userController.readUser,
);
router.post(
  '/search',
  userController.searchUser,
);
router.put(
  '/update/:id',
  // passport.authenticate('jwt', { session: false }),
  userController.updateUser
);
router.delete(
  '/delete/:id',
  // passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);
router.post('/login', passport.authenticate('local'), userController.loginUser);
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]
  }),
);
router.get(
  '/google/response',
  passport.authenticate(
    'google',
    {
      failureRedirect: 'http://localhost:8080/login',
      successRedirect: 'http://localhost:8080/',
    },
  ),
  function (req, res) {
    res.send('INSIDE THE THING');
    console.log('Authenticated!');
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
module.exports = router;
