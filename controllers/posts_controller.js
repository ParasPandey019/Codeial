const Post = require('../models/post')

module.exports.create =async function(req, res){
    const newPost = await Post.create({
        content: req.body.content,
        user: req.user.id
    });

    await newPost.save();
    return res.redirect('back');
}