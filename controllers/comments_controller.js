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

module.exports.destroy = async function(req,res){
    const currComment = await Comment.findById(req.params.id);

    if(currComment.user == req.user.id){
        let postId = currComment.post;
        currComment.deleteOne();

        Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}});
        return res.redirect('back');
    }
}
