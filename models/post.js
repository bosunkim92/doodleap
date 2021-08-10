const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: {type: mongoose.Schema.Types.ObjectId}
})

const inspiringSchema = mongoose.Schema({
    username: String,
    userId: {type: mongoose.Schema.Types.ObjectId}
})

const commentsSchema = mongoose.Schema({
    username: String,
    commentContent: String,
    userId: {type: mongoose.Schema.Types.ObjectId}
}, {
    timestamps: true
})

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    content: String,
    likes: [likesSchema],
    inspiring: [inspiringSchema],
    comments: [commentsSchema],
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);