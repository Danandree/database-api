const Post = require('../models/post');

const responseFunctionTHEN = (req, res, result) => {
    if (result) {
        res.send(result);
    }
    else {
        res.status(404).send(`Post with id "${req.params.id.toString()}"  not found`);
    }
}

const catchErrorFunciton = (req, res, err) => {
    console.log(err);
    if (err.kind == 'ObjectId') {
        res.status(404).send(`Post id "${req.params.id.toString()}" not valid`);
    }
}

const post_index = (req, res) => {
    Post.find()
        .then((result) => res.send(result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_create_post = (req, res) => {
    const post = new Post(req.body.post);
    post.save()
        .then((result) => res.status(201).send(result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_detail = (req, res) => {
    Post.findById(req.params.id)
        .then((result) => responseFunctionTHEN(req, res, result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((result) => responseFunctionTHEN(req, res, result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.post)
        .then((result) => responseFunctionTHEN(req, res, result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_by_date = (req, res) => {
    let date = new Date(req.params.date);
    let postDate = new Date(req.params.date);
    postDate.setDate(postDate.getDate() + 1);
    Post.find({ createdAt: { $gte: date, $lt: postDate } })
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
}

module.exports = {
    post_index,
    post_detail,
    post_create_post,
    post_delete,
    post_update,
    post_by_date,
}