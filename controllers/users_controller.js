const User = require("../models/users.js");


module.exports.profile =async function(req,res){
    const user = await User.findById(req.params.id);
    return res.render('users_profile.ejs',{
        title: "User profile", 
        profile_user: user
    })
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
       const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email
        });

        if(!user){
            return res.status(401).send('Unauthorized');
        }

        return res.redirect('back');
    }
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
    req.flash('success', 'Logged in Successfully')
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        req.flash('success', 'Logged out')
        res.redirect('/');
      });
}
