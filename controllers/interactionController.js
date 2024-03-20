const { default: mongoose, Mongoose } = require('mongoose');
const Interaction = require('../models/interaction');
const User = require('../models/user');

const testThen = (req, res, result) => {
    if (result) { res.send(result); }
    else { res.status(404).send(`Interaction with id "${req.params.id.toString()}" not found`); }
}

const testCatch = (req, res, err) => {
    if (err.kind == 'ObjectId') {
        res.status(404).send(`Interaction id "${req.params.id}" not valid`);
    }
}

async function getUserIdFromCity(req, res) {
    User.find({ city: req.query.city })
        .then((result) => {
            // res.send(result);
            console.log(result, "result");
            result.forEach((user) => { usersId.push(user._id); })
        })
        .catch((err) => testCatch(req, res, err));
}

const interaction_index = async (req, res) => {
    console.log(req.query, "QUERY");
    const post_id = new mongoose.Types.ObjectId(req.baseUrl.split("/")[2]);
    // const postId = new mongoose.ObjectId(req.baseUrl.split("/")[2]);
    console.log(post_id, "POST ID");
    let page = 0;
    let per_page = 20;

    try {
        let interactionsList = await Interaction.find({ post_id }, null, { limit: per_page, skip: page * per_page });
        if (req.query.per_page > 0 && req.query.per_page <= 100) { per_page = req.query.per_page; }
        if (req.query.page > 0) { page = req.query.page - 1; }
        if (req.query.date) {
            let date = new Date(req.query.date);
            let postDate = new Date(req.query.date);
            postDate.setDate(postDate.getDate() + 1);
            interactionsList = await Interaction.find({ post_id, createdAt: { $gte: date, $lt: postDate } }, null, { limit: per_page, skip: page * per_page });
        }
        if (req.query.city) {
            let userList = [];
            let userIDs = [];
            interactionsList.forEach((interaction) => { userIDs.push(interaction.user_id); })
            userList = await User.find({ _id: { $in: userIDs }, city: req.query.city });
            userIDs = [];
            userList.forEach((user) => { userIDs.push(user._id); })
            interactionsList = await Interaction.find({ post_id, user_id: { $in: userIDs } }, null, { limit: per_page, skip: page * per_page });
        }
        console.log(interactionsList,"NO FILTER");
        testThen(req, res, interactionsList);
    } catch (err) {
        testCatch(req, res, err);
    }
}

const interaction_post = async (req, res) => {
    const interaction = new Interaction(req.body.interaction);
    try {
        const result = await interaction.save();
        res.status(201).send(result);
    } catch (err) {
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
        const result = await Interaction.findByIdAndDelete(req.params.id);
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