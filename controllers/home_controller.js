const Post = require('../models/post')
const User = require('../models/users')

module.exports.home = async function(req,res){
    // const posts = await Post.find({});

    const posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec()

    const users = await User.find({});
    return res.render('home',{
        title: "Codeial | Home",
        posts: posts,
        all_users: users
    });
    
}
