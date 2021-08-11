const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const photoUrlSchema = new mongoose.Schema({
  photoUrl: String,
  userId: {type: mongoose.Schema.Types.ObjectId}
})

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, lowercase: true, unique: true},
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String,
  bio: String,
  photoUrl: [photoUrlSchema]
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

userSchema.set('toObject', {
  transform: (doc, ret, opt) => {
   delete ret.password;
   return ret;
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
