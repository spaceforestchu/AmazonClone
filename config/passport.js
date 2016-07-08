var passport = require('passport');
var localStrategy = require('passport-local').Strategy();



passport.serializeUser(function(user, done){
  done(null, user._id);
});



passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


//middlewear

passport.use('local-login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.find({email: email}, function(err, user){
    if (err) return done(err);

    if(!user) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }

    if(!user.comparePassword(password)){
      return done(null, false, req.flash('loginMessage', 'Opps! Wrong Password Pal'));
    }


    return done(null, user);
  });
}));

//custom function to validate
exports.isAuthenticated = function(req, res, next){
  if( req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
