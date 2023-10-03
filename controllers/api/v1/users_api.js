const User = require('../../../models/users');
const jwt = require('jsonwebtoken');


module.exports.createSession =async function(req,res){
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user || user.password!= req.body.password){
            return res.json(422, {message: "Invalid username or password"})
        }
        return res.json(200,{
            message:"Sign In successful",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial',{expiresIn: '10000'} )
            }
        })

    }catch(err){
        return res.json(500, {message: "Internal Server Error"});
    }
}