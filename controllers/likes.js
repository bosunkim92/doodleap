const Post = require('../models/post');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
    try {
        const post = await Post.findById(req.params.id);
        post.likes.push({username: req.user.username, userId: req.user._id});
        await post.save()
        res.status(201).json({data: 'like added'})
    } catch(err) {
        res.json({data: err})
    }
}

async function deleteLike(req, res){
    try{
        const post = await Post.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        post.likes.remove(req.params.id)
        await post.save()
        res.json({data: 'like removed'})
    } catch(err){
        res.json({error: err})
    }
}