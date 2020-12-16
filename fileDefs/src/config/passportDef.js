module.exports = `var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      console.log(user);
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
          User.findOne({'email': email}, function(err, user) {
              if (err) return done(err);
              if (user) {
                if (user.validPassword(password)) {
                  console.log(user.id + " logged in");
                  return done(null, user);
                } else {
                  console.log('Invalid email or password');
                  return done(null, false);
                }
              } else {
                var newUser = new User(req.body);
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err) throw err;
                    console.log(newUser.id + " logged in");
                    return done(null, newUser);
                });
              }
          });
        });
    }));
};`
