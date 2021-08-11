const Post = require("../models/post");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 }= require("uuid");

const s3 = new S3();

const BUCKET_NAME = process.env.AWS_BUCKET;

module.exports = {
    create,
    index,
    show,
    update,
    delete: deletePost,
}

function create(req, res) {
    try{
        const filePath=`${uuidv4()}/${req.file.originalname}`;
        const params = {
            Bucket: BUCKET_NAME,
            Key: filePath,
            Body: req.file.buffer,
        };
        s3.upload(params, async function (err, data){
            if(err){
                res.json({ data: err });
            }
            const post = await Post.create({
                content: req.body.content,
                user: req.user,
                photoUrl: data.Location,
            });
            const populatedPost = await post.populate("user").execPopulate();
            res.status(201).json({ post: populatedPost });
        });
    } catch (err) {
        res.json({ err });
    }
}

async function index(req, res) {
    try {
        const posts = await Post.find({}).populate("user").exec();
        res.status(200).json({ posts });
    } catch (err) {
    }
}

async function show(req, res) {
    try {
        const post = await Post.findOne({_id: req.params.id}).populate("user").exec();
        res.status(200).json({ post });
    } catch (err) {

    }
}

async function update(req, res) {
    try{
        const post = await Post.findOne({_id:req.params.id}).populate("user").exec();
        post.content = req.body.content;
        await post.save();
        res.status(200).json({ post });
    } catch(err) {
        res.json({ err })
    }
}

async function deletePost(req, res) {
    try{
        const post = await Post.findOne({_id:req.params.id});
        post.remove(req.params.id);
        res.json({data: 'deleted'})
    } catch(err) {
        res.json({error: err})
    }
}