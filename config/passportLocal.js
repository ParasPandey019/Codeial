const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;

const User = require('../models/users');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
    },
    async function verify(email, password, cb) {
    const user = await User.findOne({email: email});
    
    if(!user || user.password != password){
        console.log("Invalid Username/Password");
        return cb(null, false);
    }
    return cb(null, user);
}));


passport.serializeUser(function(user, cb) {
      return cb(null, user.id);
});
  

passport.deserializeUser(async function(id, cb) {
    const user = await User.findById(id);
    if(!user){
        console.log("Invalid Username");
        return cb(null);
    }
    return cb(null, user);
});


passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;

