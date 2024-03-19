const mongoose = require('mongoose');
const User = require('./user');
const Post = require('./post');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['comment', 'like']
    },
    post_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Interaction = mongoose.model('Interaction', interactionSchema);
module.exports = Interaction;