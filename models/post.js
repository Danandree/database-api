const mongoose = require('mongoose');
const Interaction = require('./interaction');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    interactions: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Interaction',
        default: [],
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;