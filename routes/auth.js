// routes/auth.js

const express = require('express');
const router = express.Router();
const localController = require('../controllers/auth-local.js');
const passport = require('passport');

/* Request login */
router.post('/login', localController.login);

/* Request registration */
router.post('/register', localController.register);

/* Request logout */
router.get('/logout', localController.logout);
router.post('/logout', localController.logout);

/* Login via facebook */
router.get('/facebook/login', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
  successFlash: 'Login successful',
  errorFlash: 'Login failed'
}));


/* Login via google */
router.get('/google/login', passport.authenticate('google',
      { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/',
  successFlash: 'Login successful',
  errorFlash: 'Login failed'
}));

module.exports = router;

