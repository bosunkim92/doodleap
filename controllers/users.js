const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

const BUCKET_NAME= process.env.AWS_BUCKET

module.exports = {
  signup,
  login,
  profile,
  update
};

async function signup(req, res) {
    const user = new User({...req.body});
    user.photoUrl.push({photoUrl:"https://react.semantic-ui.com/images/wireframe/square-image.png"})
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      res.status(400).json(err);
    }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'user not found'});
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'password not matching'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  try {
    const user = await User.findOne({username: req.params.username})
    if(!user) res.status(404).json({message: 'bad parameters'})

    const posts = await Post.find({user: user._id})
    res.status(200).json({posts: posts, user: user}) 
  } catch (err) {
    res.json({err})
  }
}

async function update(req, res){
    try {
      const user = await User.findOne({username: req.params.username});
      if(!user) return res.status(404).json({message: 'Bad Parameters'});

      const filePath=`${uuidv4()}/${req.file.originalname}`
      const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer};

      s3.upload(params, async function(err, data){
        if(err) {
          res.json({data: err});
        }
        user.bio = req.body.bio;
        await user.photoUrl.unshift({photoUrl:data.Location, userId:user._id});
        await user.save();
      })
      res.status(200).json({user: user}) 
    } catch (err) {

    }
} 


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}
