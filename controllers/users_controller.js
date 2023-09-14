const User = require("../models/users.js");


module.exports.profile = function(req,res){
    return res.render('users.ejs',{
        title: "Users"
    })
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up.ejs',{
        title: "Codeial_SignUp"
    })
}

module.exports.signIn = function(req,res){
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
    return res.redirect('/');
}
