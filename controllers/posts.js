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
    console.log(req.file, req.body, "this is create method", req.user);
    try{
        const filePath=`${uuidv4()}/${req.file.originalname}`;
        const params = {
            Bucket: BUCKET_NAME,
            Key: filePath,
            Body: req.file.buffer,
        };
        s3.upload(params, async function (err, data){
            if(err){
                console.log(err);
                res.json({ data: err });
            }
            console.log(data, ' this data')
            const post = await Post.create({
                content: req.body.content,
                user: req.user,
                photoUrl: data.Location,
            });
            const populatedPost = await post.populate("user").execPopulate();
            res.status(201).json({ post: populatedPost });
        });
    } catch (err) {
        console.log(err);
        res.json({ err });
    }
}

async function index(req, res) {
    try {
        const posts = await Post.find({}).populate("user").exec();
        res.status(200).json({ posts });
    } catch (err) {
        console.log("something went wrong while loading page")
    }
}

async function show(req, res) {
    try {
        const post = await Post.findOne({_id: req.params.id}).populate("user").exec();
        res.status(200).json({ post });
    } catch (err) {
        console.log("show individual post failed");
    }
}

async function update(req, res) {
    console.log("update function from the posts.js controller is firing")
    console.log(req, " this is req")
    console.log(req.body, "this is update req.body");
    try{
        const post = await Post.findOne({_id:req.params.id}).populate("user").exec();
        post.content = req.body.content;
        post.save();
    } catch(err) {
        console.log(err);
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