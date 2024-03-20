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

const user_index = async (req, res) => {
    try {
        const result = await User.find();
        userResponseThen(req, res, result);
    } catch (err) {
        userResponseError(req, res, err);
    }
}

const user_create_post = async (req, res) => {
    const user = new User(req.body.user);
    try {
        const result = await user.save();
        res.status(201).send(result);
    } catch (err) {
        userResponseError(req, res, err);
    }
}

const user_detail = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        userResponseThen(req, res, user);
    }catch(err){
        userResponseError(req, res, err);
    }
}

const user_delete = async (req, res) => {
    try{
        const result = await User.findByIdAndDelete(req.params.id);
        userResponseThen(req, res, result);
    }catch(err){
        userResponseError(req, res, err);
    }

}

const user_update = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user)
        .then((result) => userResponseThen(req, res, result))
        .catch((err) => userResponseError(req, res, err));
    try{
        const result = await User.findByIdAndUpdate(req.params.id, req.body.user);
        userResponseThen(req, res, result);
    }catch(err){
        userResponseError(req, res, err);
    }
}

module.exports = {
    user_index,
    user_detail,
    user_create_post,
    user_delete,
    user_update,
}