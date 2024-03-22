const User = require('../models/user');

const userResponseThen = (req, res, result, status = 200) => {
    if (!result) {
        result = { message: `User id "${req.params.id.toString()}" doesn't exists` };
        status = 404;
    }
    res.status(status).json(result);
}

const userResponseError = (req, res, err, status = 404) => {
    console.log(err);
    let message = {};
    if (err.kind == 'ObjectId') {
        message = { message: `User id "${req.params.id.toString()}" not valid` };
    }
    if (err.errors) {
        message = { message: err.errors.message };
        if (err.errors.age) {
            status = 400;
            message = { message: err.errors.age.message };
        }

    }
    res.status(status).send(message);
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
    const duplicateUser = await User.find({ username: user.username });
    if (duplicateUser.length === 0) {
        try {
            const result = await user.save();
            userResponseThen(req, res, result, 201);
        } catch (err) {
            userResponseError(req, res, err);
        }
    }
    else {
        userResponseError(req, res, { errors: { message: "Username already exists" } }, 400);
    }
}

const user_detail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        userResponseThen(req, res, user);
    } catch (err) {
        userResponseError(req, res, err);
    }
}

const user_delete = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        userResponseThen(req, res, result);
    } catch (err) {
        userResponseError(req, res, err);
    }

}

const user_update = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body.user);
        userResponseThen(req, res, result);
    } catch (err) {
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