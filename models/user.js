const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 100
    },
    city: {
        type: String,
        required: true,
        lowercase: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;