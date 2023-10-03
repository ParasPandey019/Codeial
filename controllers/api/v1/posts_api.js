const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}


module.exports.destroy =async function(req, res){
    try{
        const currPost = await Post.findById(req.params.id);
        // .id means converting the object id into string
        currPost.deleteOne();
        await Comment.deleteMany({
            post: req.params.id,
        })
        return res.json(200, {message: "Post and associated comments deleted"});
    }catch(err){
        console.log(err);
        return res.json(500, {message: "Internal server error"})
    }

}