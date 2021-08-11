const Post = require('../models/post');

module.exports = {
    create,
    deleteInspiring
}

async function create(req, res){
    try {
        const post = await Post.findById(req.params.id);
        post.inspiring.push({username: req.user.username, userId: req.user._id});
        await post.save()
        res.status(201).json({data: 'inspiring added'})
    } catch(err) {
        res.json({data: err})
    }
}

async function deleteInspiring(req, res){
    try{
        const post = await Post.findOne({'inspiring._id': req.params.id, 'inspiring.username': req.user.username});
        post.inspiring.remove(req.params.id)
        await post.save()
        res.json({data: 'inspiring removed'})
    } catch(err){
        res.json({error: err})
    }
}