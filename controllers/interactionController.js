const { default: mongoose, Mongoose } = require('mongoose');
const Interaction = require('../models/interaction');
const User = require('../models/user');
const Post = require('../models/post');

const testThen = (req, res, result, status = 200) => {
    console.log(result, "RESULT");
    if (result == null) {
        result = { message: `Interaction id "${req.params.id.toString()}" not found` };
        status = 404;
    }
    res.status(status).send(result);
}

const testCatch = (req, res, err, status = 404) => {
    let response = {};
    console.log(err, "CATCH ERROR");
    if (err.kind == 'ObjectId') {
        response = { message: `Interaction id "${req.params.id}" not valid` };
    }
    if (err.errors.type) {
        status = 400;
        response = { message: err.errors.type.properties.message };
    }
    res.status(status).send(response);
    // console.log(err.errors.type.properties.message);
}

const interaction_index = async (req, res) => {
    const post_id = new mongoose.Types.ObjectId(req.baseUrl.split("/")[2]);
    const post = await Post.findById(post_id);
    if (!post) {
        return testThen(req, res, { error: { message: `Post id "${post_id}" not found` } }, 404);
    }
    let page = 0;
    let per_page = 20;
    let interactionsList = [];
    let query = { post_id };
    if (req.query.per_page > 0 && req.query.per_page <= 100) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }
    if (req.query.date) {
        let date = new Date(req.query.date);
        let postDate = new Date(req.query.date);
        postDate.setDate(postDate.getDate() + 1);
        query.createdAt = { $gte: date, $lt: postDate };
    }
    if (req.query.city) {
        let userList = [];
        let userIDs = [];
        try {
            interactionsList = await Interaction.find(query);
            interactionsList.forEach((interaction) => { userIDs.push(interaction.user_id); })
            userList = await User.find({ _id: { $in: userIDs }, city: req.query.city });
            userIDs = [];
            userList.forEach((user) => { userIDs.push(user._id); })
            query.user_id = { $in: userIDs };
        }
        catch (err) {
            testCatch(req, res, err);
        }
    }
    try {
        interactionsList = await Interaction.find(query, null, { limit: per_page, skip: page * per_page });
        testThen(req, res, interactionsList);
    }
    catch (err) {
        testCatch(req, res, err);
    }
}

const interaction_post = async (req, res) => {
    const interaction = new Interaction(req.body.interaction);
    try {
        const user = await User.findById(interaction.user_id);
        const post = await Post.findById(interaction.post_id);
        if (user && post) {
            const result = await interaction.save();
            testThen(req, res, result, 201);
        }
        else {
            let message = { error: { message: "User and post must exist" } };
            if (user) { message.error.message = "Post must exist"; }
            if (post) { message.error.message = "User must exist"; }
            testThen(req, res, message, 404);
        }
    }
    catch (err) {
        testCatch(req, res, err);
    }
}

const interaction_delete = async (req, res) => {
    try {
        const result = await Interaction.findByIdAndDelete(req.params.id);
        testThen(req, res, result);
    } catch (err) {
        testCatch(req, res, err);
    }
}

const interaction_update = async (req, res) => {
    try {
        const result = await Interaction.findByIdAndUpdate(req.params.id, req.body.interaction);
        testThen(req, res, result);
    } catch (err) {
        testCatch(req, res, err);
    }
}

module.exports = {
    interaction_post,
    interaction_index,
    interaction_delete,
    interaction_update,
}