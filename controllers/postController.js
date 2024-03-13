const Post = require('../models/post');

const post_index = (req, res) => {
    Post.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
}

const post_detail = (req, res) => {
    Post.findById(req.params.id)
        .then((result) => {
            if (result) { res.send(result); }
            else { res.status(404).send(`Post id "${req.params.id.toString()}" doesn't exists`); }
        })
        .catch((err) => {
            console.log(err);
            if (err.kind == 'ObjectId') {
                res.status(404).send(`Post id "${req.params.id.toString()}"  not valid`);
            }
        });
}

const post_create_post = (req, res) => {
    const post = new Post(req.body.post);
    post.save()
        .then((result) => res.status(201).send(result))
        .catch((err) => console.log(err));
}

const post_delete = (req, res) => {
    console.log(req.params.id, "REQ PARAMS ID");
    Post.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.status(404).send(`Post with id "${req.params.id.toString()}"  not found`);
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.kind == 'ObjectId') {
                res.status(404).send(`Post id "${req.params.id.toString()}"  not valid`);
            }
        });
}

const post_update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.post)
        .then((result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.status(404).send(`Post with id "${req.params.id.toString()}"  not found`);
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.kind == 'ObjectId') {
                res.status(404).send(`Post id "${req.params.id.toString()}"  not valid`);
            }
        });
}

module.exports = {
    post_index,
    post_detail,
    post_create_post,
    post_delete,
    post_update,
}