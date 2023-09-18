const User = require("../models/users.js");


module.exports.profile = function(req,res){
    return res.render('users_profile.ejs',{
        title: "profile page",
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up.ejs',{
        title: "Codeial_SignUp"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in.ejs',{
        title: "Codeial_SignIn"
    })
}

module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }

    const user = await User.findOne({email:req.body.email});
    
    if(!user){
        const newUser =  await User.create(req.body);
        await newUser.save();
        return res.redirect("/users/sign-in")
    }else{
        return res.redirect("back");
    }
}

module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        res.redirect('/');
      });
}
