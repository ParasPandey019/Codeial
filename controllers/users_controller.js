module.exports.profile = function(req,res){
    return res.render('users.ejs',{
        title: "Users"
    })
}

