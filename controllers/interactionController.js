const mongoose = require('mongoose');
const Interaction = require('../models/interaction');
const User = require('../models/user');
const Post = require('../models/post');

const sendRequestResponse = (req, res, result, status = 200) => {
    if (result == null) {
        result = { message: `Interaction id "${req.params.id.toString()}" not found` };
        status = 404;
    }
    res.status(status).send(result);
}

const catchRequestError = (req, res, err, status = 404) => {
    console.log(err);
    console.log(err.path,"path");
    let response = { error: {} };
    if (err.kind == 'ObjectId') {
        status = 400
        if (err.type == 'Post') {
            response.error = { message: `Interaction id "${err.value}" not found` };
        }
        if (err.path == "_id") {
            response.error = { message: `Interaction id "${req.params.id.toString()}" not valid` };
        }
        if (err.path == 'post_id' || err.path == 'user_id') {
            response.error = { message: `${err.path} "${err.value}" not found` };
        }
    }
    if (err.errors) {
        if (err.errors.type) {
            status = 400;
            response.error = { message: err.errors.type.properties.message };
        }
    }
    console.log(response,"response");
    res.status(status).send(response);
}

const interaction_index = async (req, res) => {
    let post_id = req.baseUrl.split("/")[2];
    try {
        post_id = new mongoose.Types.ObjectId(post_id);
        const post = await Post.findById(post_id);
        if (!post) {
            return catchRequestError(req, res, { kind: 'ObjectId', type: 'Post' });
        }

    } catch (err) {
        return catchRequestError(req, res, { kind: 'ObjectId', type: 'Post' });

    }
    let page = 0;
    let per_page = 100;
    let interactionsList = [];
    let query = { post_id };
    if (req.query.per_page > 0) { per_page = req.query.per_page; }
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
            return catchRequestError(req, res, err);
        }
    }
    try {
        interactionsList = await Interaction.find(query, null, { limit: per_page, skip: page * per_page });
        sendRequestResponse(req, res, interactionsList);
    }
    catch (err) {
        catchRequestError(req, res, err);
    }
}

const interaction_post = async (req, res) => {
    const interaction = new Interaction(req.body.interaction);
    try {
        const user = await User.findById(interaction.user_id);
        const post = await Post.findById(interaction.post_id);
        if (user && post) {
            const result = await interaction.save();
            sendRequestResponse(req, res, result, 201);
        }
        else {
            let message = { error: { message: "User and post must exist" } };
            if (user) { message.error.message = "Post must exist"; }
            if (post) { message.error.message = "User must exist"; }
            sendRequestResponse(req, res, message, 400);
        }
    }
    catch (err) {
        catchRequestError(req, res, err);
    }
}

const interaction_delete = async (req, res) => {
    try {
        const result = await Interaction.findByIdAndDelete(req.params.id);
        sendRequestResponse(req, res, result);
    } catch (err) {
        catchRequestError(req, res, err);
    }
}

const interaction_update = async (req, res) => {
    try {
        const result = await Interaction.findByIdAndUpdate(req.params.id, req.body.interaction);
        sendRequestResponse(req, res, result);
    } catch (err) {
        catchRequestError(req, res, err);
    }
}

module.exports = {
    interaction_post,
    interaction_index,
    interaction_delete,
    interaction_update,
    sendRequestResponse,
    catchRequestError
}