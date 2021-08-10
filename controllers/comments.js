const Post = require('../models/post');

module.exports = {
    create,
    update,
    delete: deleteComment
}

async function create(req, res){
    console.log(req.params.id);
    console.log('this is comment create function req.params.id');
    console.log(req.body);
    console.log('this is comment create req.body')
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({
            username: req.user.username,
            commentContent: req.body.commentContent,
            userId: req.user._id});
        await post.save()
        res.redirect('back');
    } catch(err) {
        console.log(err)
        res.json({data: err})
    }
}

async function update(req, res) {
    console.log(req.params.id);
    console.log('this is comment update function req.params.id');
    console.log(req.body);
    console.log('this is comment update req.body')
    try{
        const post = Post.findOne({'comments._id': req.params.id, 'comments.username': req.user.username})
        .populate('comments')
        .exec(function(err, post){
            const comment = post.comments.id(req.params.id);
            console.log(comment)
            console.log("THIS IS COMMENT SEARCH FROM CONTROLLER UPDATE")
            comment.commentContent = req.body.commentContent;
            console.log(comment)
            console.log("THIS IS COMMENT AFTER THE CHANGE")
            post.save();
        })
        console.log(post)
        console.log("this is post from controller update")
        await post.save();
        res.json({data: 'comment updated'});
    } catch(err) {
        console.log(err)
    }
}

async function deleteComment(req, res){
    try{
        const post = await Post.findOne({'comments._id': req.params.id, 'comments.username': req.user.username});
        post.comments.remove(req.params.id)
        await post.save()
        res.json({data: 'comment deleted'})
    } catch(err){
        console.log(err)
        res.json({error: err})
    }
}