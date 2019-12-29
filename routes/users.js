const userController = require('../controller/index');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.createUser);
router.get(
  '/read',
  passport.authenticate('jwt', { session: false }),
  userController.readUser,
);
router.post(
  '/search',
  passport.authenticate('jwt', { session: true }),
  userController.searchUser,
);
router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);
router.post('/login', passport.authenticate('local'), userController.loginUser);

module.exports = router;
