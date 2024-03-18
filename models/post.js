const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
    },
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;