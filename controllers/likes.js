const Post = require('../models/post');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
    console.log(req.params.id);
    console.log('this is likes create function req.params.id');
    try {
        const post = await Post.findById(req.params.id);
        post.likes.push({username: req.user.username, userId: req.user._id});
        await post.save()
        res.status(201).json({data: 'like added'})
    } catch(err) {
        console.log(err)
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
        console.log(err)
        res.json({error: err})
    }
}