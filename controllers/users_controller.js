const User = require("../models/users.js");
const fs = require("fs");
const path = require("path");


module.exports.profile =async function(req,res){
    const user = await User.findById(req.params.id);
    return res.render('users_profile.ejs',{
        title: "User profile", 
        profile_user: user
    })
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err){
            if(err){console.log("multer error", err);}
            else{
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname , '..', user.avatar));
                    }

                    user.avatar = User.avatarPath +'/' + req.file.filename;
                }
                user.save();
            }
        })
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
