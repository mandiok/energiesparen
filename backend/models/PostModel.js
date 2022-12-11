const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    id: String,
    userId: String,
    userName: String,
    date: String,
    text: String
});
const postSchema = new mongoose.Schema({
    id: String,
    userId: String,
    userName: String,
    date: String,
    title: String,
    text: String,
    link: String,
    picture: String,
    likes: [String],
    comments:
        [commentSchema],

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;