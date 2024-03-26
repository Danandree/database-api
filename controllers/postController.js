const Post = require('../models/post');
const Interaction = require('../models/interaction');

const sendRequestResponse = (req, res, result, status = 200) => {
    if (result == null) {
        result = { message: `Post id "${req.params.id.toString()}" not found` };
        status = 404;
    }
    res.status(status).send(result);
}

const catchRequestError = (req, res, err, status = 404) => {
    console.log(err);
    let response = { error: {} };
    if (err.kind == 'ObjectId') {
        response.error = { message: `Post id "${req.params.id.toString()}" not found` };
    }
    res.status(status).send(response);
}

const post_index = async (req, res) => {
    let page = 0;
    let per_page = 100;
    let findQuery = {};
    if (req.query.per_page > 0) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }
    if (req.query.date) {
        let date = new Date(req.query.date);
        let postDate = new Date(req.query.date);
        postDate.setDate(postDate.getDate() + 1);
        findQuery.createdAt = { $gte: date, $lt: postDate };
    }
    try {
        const postList = await Post.find(findQuery, null, { limit: per_page, skip: page * per_page });
        const postIds = postList.map((post) => post._id);
        const interactionsList = await Interaction.find({ post_id: { $in: postIds } });
        postList.forEach((post) => {
            post.interactions = interactionsList.filter((interaction) => interaction.post_id.toString() === post._id.toString()).map((interaction) => interaction.id);
        });
        sendRequestResponse(req, res, postList);
    } catch (err) {
        catchRequestError(req, res, err);
    }

}

const post_create_post = async (req, res) => {
    const post = new Post(req.body.post);
    try {
        const result = await post.save();
        sendRequestResponse(req, res, result, 201);
    } catch (err) {
        catchRequestError(req, res, err);
    }
}

const post_detail = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            const interactionsList = await Interaction.find({ post_id: req.params.id });
            post.interactions = interactionsList.map((interaction) => interaction.id);
        }
        sendRequestResponse(req, res, post);
    }
    catch (err) {
        catchRequestError(req, res, err);
    }
}

const post_delete = async (req, res) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id);
        sendRequestResponse(req, res, result);
    }
    catch (err) {
        catchRequestError(req, res, err);
    }
}

const post_update = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        sendRequestResponse(req, res, result);
    }
    catch (err) {
        catchRequestError(req, res, err);
    }
}

module.exports = {
    post_index,
    post_detail,
    post_create_post,
    post_delete,
    post_update,
    sendRequestResponse,
    catchRequestError
}