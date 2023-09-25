const Post = require('../models/post')
const Comment = require('../models/comments');

module.exports.create =async function(req, res){
    const newPost = await Post.create({
        content: req.body.content,
        user: req.user.id
    });

    await newPost.save();
    return res.redirect('back');
}


module.exports.destroy =async function(req, res){
    const currPost = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if(currPost.user == req.user.id){
        currPost.deleteOne();
        await Comment.deleteMany({
            post: req.params.id,
        })
         return res.redirect('back');
    }else{
        return res.redirect('back');
    }
}