// controllers/passport.js
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/appcfg');

module.exports = function (passport) {
  passport.use(User.createStrategy());

  if (config.auth.facebook.enabled) {
    const fbConf = config.auth.facebook;
    passport.use(new FacebookStrategy({
      clientID: fbConf.appId,
      clientSecret: fbConf.appSecret,
      callbackURL: fbConf.callbackURL,
      profileFields: ['id', 'emails'],
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {
          let newUser;
          if (req.user) {
            // user is logged in, link accounts
            newUser = new User(req.user);
            newUser['facebook']['id'] = profile.id;
            newUser['facebook']['email'] = profile.emails[0].value;
          } else {
            // unauthenticated session, create new account
            newUser = new User({
              'facebook.email': profile.emails[0].value,
              'facebook.id': profile.id
            });
          }
          newUser.save(function (err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    }));
  }

  if (config.auth.google.enabled) {
    const googConf = config.auth.google;
    passport.use(new GoogleStrategy({
      clientID: googConf.clientId,
      clientSecret: googConf.clientSecret,
      callbackURL: googConf.callbackURL,
      profileFields: ['id', 'emails'],
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {
          let newUser;
          if (req.user) {
            // user is logged in, link accounts
            newUser = new User(req.user);
            newUser['google']['id'] = profile.id;
            newUser['google']['email'] = profile.emails[0].value;
          } else {
            // unauthenticated session, create new account
            newUser = new User({
              'google.email': profile.emails[0].value,
              'google.id': profile.id
            });
          }
          newUser.save(function (err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    }));
  }

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

