const User = require("../models/users.js");


module.exports.profile =async function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id).exec().then(userData => {
            return res.render('user_profile',{
                title: "User Profile",
                user: userData
            })
        }).catch((err) =>{
            return res.redirect("/users/sign-in");
        });
    }
    else{
        return res.redirect("/users/sign-in");
    }
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

module.exports.createSession = async function(req,res){
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return res.redirect("back");
    }else{
        if(user.password != req.body.password){
            return res.redirect("back");
        }

        res.cookie('user_id', user._id);
        return res.redirect("/users/profile");
    }
}

