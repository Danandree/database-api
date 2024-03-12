const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({
    type: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Interaction = mongoose.model('Interaction', interactionSchema);
module.exports = Interaction;