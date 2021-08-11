const Post = require('../models/post');

module.exports = {
    create,
    update,
    delete: deleteComment
}

async function create(req, res){
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({
            username: req.user.username,
            commentContent: req.body.commentContent,
            userId: req.user._id});
        await post.save()
        res.redirect('back');
    } catch(err) {
        res.json({data: err})
    }
}

async function update(req, res) {
    try{
        const post = Post.findOne({'comments._id': req.params.id, 'comments.username': req.user.username})
        .populate('comments')
        .exec(function(err, post){
            const comment = post.comments.id(req.params.id);
            comment.commentContent = req.body.commentContent;
            post.save();
        })
        await post.save();
        res.json({data: 'comment updated'});
    } catch(err) {
    }
}

async function deleteComment(req, res){
    try{
        const post = await Post.findOne({'comments._id': req.params.id, 'comments.username': req.user.username});
        post.comments.remove(req.params.id)
        await post.save()
        res.json({data: 'comment deleted'})
    } catch(err){
        res.json({error: err})
    }
}