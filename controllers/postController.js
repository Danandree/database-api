const Post = require('../models/post');

function thenResponse(req, res, result) {
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
    let page = 0;
    let per_page = 20;
    if (req.query.per_page > 0 && req.query.per_page <= 100) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }
    if (req.query.date) {
        console.log(req.query.date);
        let date = new Date(req.query.date);
        let postDate = new Date(req.query.date);
        postDate.setDate(postDate.getDate() + 1);
        Post.find({ createdAt: { $gte: date, $lt: postDate } }, null, { limit: per_page, skip: page * per_page })
            .then((result) => res.send(result))
            .catch((err) => catchErrorFunciton(req, res, err));
    }
    else {
        Post.find({}, null, { limit: per_page, skip: page * per_page })
            .then((result) => thenResponse(req, res, result))
            .catch((err) => catchErrorFunciton(req, res, err));
    }
}

const post_create_post = (req, res) => {
    const post = new Post(req.body.post);
    post.save()
        .then((result) => res.status(201).send(result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_detail = (req, res) => {
    console.log(req.params.id, "REQ ID");
    Post.findById(req.params.id)
        .then((post) => thenResponse(req, res, post))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((result) => thenResponse(req, res, result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

const post_update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.post)
        .then((result) => thenResponse(req, res, result))
        .catch((err) => catchErrorFunciton(req, res, err));
}

module.exports = {
    post_index,
    post_detail,
    post_create_post,
    post_delete,
    post_update,
}