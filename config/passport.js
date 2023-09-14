const passport = require('passport');
const LocalStrategy   = require('passport-local');

const User = require('../models/users.js');

// passport.use(new LocalStrategy(async function verify(email, password, cb) {
//     const user = await User.findOne({email: email});
    
//     if(!user || user.password != password){
//         console.log("Invalid Username/Password");
//         return cb(null, false);
//     }
//     return cb(null, user);
// }));



// passport.serializeUser(function(user, cb) {
//     cb(null, user.id);
// });
  


// passport.deserializeUser(async function(id, cb) {
//     const user = await User.findOne({email: email});
//     if(!user){
//         console.log("Invalid Username");
//         return cb(null, false);
//     }
//     return cb(null, user);
// });

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({email: username});

    if(!user || user.password != password){
        console.log("Invalid Username/Password");
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return cb(err); }
    if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
    });
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