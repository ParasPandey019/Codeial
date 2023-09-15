const passport = require('passport');
const LocalStrategy   = require('passport-local');

const User = require('../models/users.js');


passport.use(new LocalStrategy({
    usernameField: 'email'
    },async function verify(email, password, cb) {
    const user = await User.findOne({email: email});
    
    if(!user || user.password != password){
        console.log("Invalid Username/Password");
        return cb(null, false);
    }
    return cb(null, user);
}));


passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user.id);
    });
});
  

passport.deserializeUser(async function(id, cb) {
    const user = await User.findById(id);
    if(!user){
        console.log("Invalid Username");
        return cb(null, false);
    }
    return cb(null, user);
});


module.exports = passport;