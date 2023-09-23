const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.create = async function(req,res){
    const currPost = await Post.findById(req.body.post);
    if(currPost){
        const newComment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        currPost.comments.push(newComment);
        await currPost.save();
        await newComment.save();
        return res.redirect('/');
    }
    
}

