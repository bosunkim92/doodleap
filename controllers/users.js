const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets

const BUCKET_NAME= process.env.AWS_BUCKET

module.exports = {
  signup,
  login,
  profile,
  update
};

async function signup(req, res) {
  console.log(req.body)
  console.log('this is from users controller signup function')

    const user = new User({...req.body});
    try {
      await user.save();
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'user not found'});
    // had to update the password from req.body.pw, to req.body password
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
  console.log(req.params)
  try {
    const user = await User.findOne({username: req.params.username})
    if(!user) res.status(404).json({message: 'bad parameters'})

    const posts = await Post.find({user: user._id})
    res.status(200).json({posts: posts, user: user}) 
  } catch (err) {
    console.log(err)
    res.json({err})
  }
}

async function update(req, res){
  console.log(req.body, req.file)

    try {
      const user = await User.findOne({username: req.params.username});
      if(!user) return res.status(404).json({message: 'Bad Parameters'});

      console.log(user);
      console.log('this is user; expecting to include user object');

      const filePath=`${uuidv4()}/${req.file.originalname}`
      const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer};

      s3.upload(params, async function(err, data){
        if(err) {
          console.log(err);
          res.json({data: err});
        }
        console.log(data, 'from aws')
        user.content = req.body.content;
        user.photoUrl = data.Location;
        user.save(function(err){
          if (err){
            console.log(err);
          }
        })
      })
    } catch (err) {
      console.log(err);
    }
} 


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
