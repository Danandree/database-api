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

// async function post_index(req, res) {
const post_index = async (req, res) => {
    let page = 0;
    let per_page = 20;
    if (req.query.per_page > 0 && req.query.per_page <= 100) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }
    if (req.query.date) {
        console.log(req.query.date);
        let date = new Date(req.query.date);
        let postDate = new Date(req.query.date);
        postDate.setDate(postDate.getDate() + 1);
        try {
            const result = await Post.find({ createdAt: { $gte: date, $lt: postDate } }, null, { limit: per_page, skip: page * per_page });
            thenResponse(req, res, result);
        }
        catch (err) { catchErrorFunciton(req, res, err); }
    }
    else {
        try {
            const result = await Post.find({}, null, { limit: per_page, skip: page * per_page });
            thenResponse(req, res, result);
        } catch (err) {
            catchErrorFunciton(req, res, err);
        }
    }
}

// async function post_create_post(req, res) {
const post_create_post = async (req, res) => {
    const post = new Post(req.body.post);
    try {
        const result = await post.save();
        res.status(201).send(result);
    } catch (err) {
        catchErrorFunciton(req, res, err);
    }
}

// async function post_detail(req, res) {
const post_detail = async (req, res) => {
    console.log(req.params.id, "REQ ID");
    try {
        const post = await Post.findById(req.params.id);
        thenResponse(req, res, post);
    }
    catch (err) { catchErrorFunciton(req, res, err); }
}

// async function post_delete(req, res) {
const post_delete = async (req, res) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id);
        thenResponse(req, res, result);
    }
    catch (err) {
        catchErrorFunciton(req, res, err);
    }
}

// async function post_update(req, res) {
const post_update = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        thenResponse(req, res, result);
    }
    catch (err) {
        catchErrorFunciton(req, res, err);
    }
}

module.exports = {
    post_index,
    post_detail,
    post_create_post,
    post_delete,
    post_update,
}