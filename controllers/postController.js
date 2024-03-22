const Post = require('../models/post');
const Interaction = require('../models/interaction');

const mainResponse = (req, res, result, status = 200) => {
    if (result == null) { 
        result = {message: `Post id "${req.params.id.toString()}" not found`}; 
        status = 404;
    }
    res.status(status).json(result);
}

const catchError = (req, res, err) => {
    console.log(err,"CATCH ERROR");
    if (err.kind == 'ObjectId') {
        res.status(404).send({message: `Post id "${req.params.id.toString()}" not valid`});
    }
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
        mainResponse(req, res, postList);
    } catch (err) {
        catchError(req, res, err);
    }

}

const post_create_post = async (req, res) => {
    const post = new Post(req.body.post);
    try {
        const result = await post.save();
        mainResponse(req, res, result, 201);
    } catch (err) {
        catchError(req, res, err);
    }
}

const post_detail = async (req, res) => {
    console.log(req.params.id, "REQ ID");
    try {
        const post = await Post.findById(req.params.id);
        console.log(post, "POST");
        if (post) {
            const interactionsList = await Interaction.find({ post_id: req.params.id });
            post.interactions = interactionsList.map((interaction) => interaction.id);
        }
        mainResponse(req, res, post);
    }
    catch (err) { catchError(req, res, err); }
}

const post_delete = async (req, res) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id);
        mainResponse(req, res, result);
    }
    catch (err) {
        catchError(req, res, err);
    }
}

const post_update = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        mainResponse(req, res, result);
    }
    catch (err) {
        catchError(req, res, err);
    }
}

module.exports = {
    post_index,
    post_detail,
    post_create_post,
    post_delete,
    post_update,
}