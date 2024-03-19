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

const interaction_index = (req, res) => {
    console.log(req.query, "QUERY");
    const post_id = new mongoose.Types.ObjectId(req.baseUrl.split("/")[2]);
    // const postId = new mongoose.ObjectId(req.baseUrl.split("/")[2]);
    console.log(post_id, "POST ID");
    let page = 0;
    let per_page = 20;

    let interactionsList = [];

    if (req.query.per_page > 0 && req.query.per_page <= 100) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }

    if (req.query.city && req.query.date) {
        console.log("CITY AND DATE");
        let date = new Date(req.query.date);
        let postDate = new Date(req.query.date);
        postDate.setDate(postDate.getDate() + 1);
        User.find({ city: req.query.city })
            .then((userList) => {
                // res.send(result);
                console.log(userList, "result");
                for (let user = 0; user < userList.length; user++) {
                    Interaction.find({ post_id, user_id: userList[user]._id, createdAt: { $gte: date, $lt: postDate } }, null, { limit: per_page, skip: page * per_page })
                        .then((result) => {
                            interactionsList = interactionsList.concat(result);
                            res.send(interactionsList);
                        })
                        .catch((err) => testCatch(req, res, err));
                }
            })
            .catch((err) => testCatch(req, res, err))
        return;
    }

    if (req.query.date) {
        console.log("ONLY DATE");
        let date = new Date(req.query.date);
        let postDate = new Date(req.query.date);
        postDate.setDate(postDate.getDate() + 1);
        Interaction.find({ post_id, createdAt: { $gte: date, $lt: postDate } }, null, { limit: per_page, skip: page * per_page })
            .then((result) => res.send(result))
            .catch((err) => testCatch(req, res, err));
        return;
    }

    // cambiare -> cercare prima interaction e dopo user
    if (req.query.city) {
        console.log("ONLY CITY");
        User.find({ city: req.query.city })
            .then((userList) => {
                console.log(userList, "result");
                console.log(post_id, "POST ID");
                for (let user = 0; user < userList.length; user++) {
                    console.log(userList[user]._id, "USER ID");
                    Interaction.find({ post_id, user_id: userList[user]._id }, null, { limit: per_page, skip: page * per_page })
                        .then((result) => {
                            console.log(result, "INTERACTIONS RESULT");
                            interactionsList = interactionsList.concat(result);
                            res.send(interactionsList);
                        })
                        .catch((err) => testCatch(req, res, err));
                }
            })
            .catch((err) => testCatch(req, res, err));
        return;
    }

    console.log("NO FILTER");
    Interaction.find({ post_id }, null, { limit: per_page, skip: page * per_page })
        .then((result) => res.send(result))
        .catch((err) => testCatch(req, res, err));

}

const interaction_post = (req, res) => {
    const interaction = new Interaction(req.body.interaction);
    interaction.save()
        .then((result) => res.status(201).send(result))
        .catch((err) => testCatch(req, res, err));
}

const interaction_delete = (req, res) => {
    Interaction.findByIdAndDelete(req.params.id)
        .then((result) => testThen(req, res, result))
        .catch((err) => testCatch(req, res, err));
}

const interaction_update = (req, res) => {
    Interaction.findByIdAndUpdate(req.params.id, req.body.interaction)
        .then((result) => testThen(req, res, result))
        .catch((err) => testCatch(req, res, err));
}

module.exports = {
    interaction_post,
    interaction_index,
    interaction_delete,
    interaction_update,
}