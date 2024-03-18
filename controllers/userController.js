const User = require('../models/user');

const userResponseThen = (req, res, result) => {
    if (result) { res.send(result); }
    else { res.status(404).send(`User id "${req.params.id.toString()}" doesn't exists`); }
}

const userResponseError = (req, res, err) => {
    console.log(err);
    if (err.kind == 'ObjectId') {
        res.status(404).send(`User id "${req.params.id.toString()}" not valid`);
    }
}

const user_index = (req, res) => {
    User.find()
        .then((result) => res.send(result))
        .catch((err) => userResponseError(req, res, err));
}

const user_create_post = (req, res) => {
    const user = new User(req.body.user);
    user.save()
        .then((result) => res.status(201).send(result))
        .catch((err) => userResponseError(req, res, err));
}

const user_detail = (req, res) => {
    User.findById(req.params.id)
        .then((result) => userResponseThen(req, res, result))
        .catch((err) => userResponseError(req, res, err));
}

const user_delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => userResponseThen(req, res, result))
        .catch((err) => userResponseError(req, res, err));

}

const user_update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user)
        .then((result) => userResponseThen(req, res, result))
        .catch((err) => userResponseError(req, res, err));
}

module.exports = {
    user_index,
    user_detail,
    user_create_post,
    user_delete,
    user_update,
}