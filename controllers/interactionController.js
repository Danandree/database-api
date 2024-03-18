const Interaction = require('../models/interaction');

const testCatch = (req, res, err) => {
    if (err.kind == 'ObjectId') {
        res.status(404).send(`Interaction id "${req.params.id.toString()}" not valid`);
    }
}

const testThen = (req, res, result) => {
    if (result) { res.send(result); }
    else { res.status(404).send(`Interaction with id "${req.params.id.toString()}" not found`); }
}

const interaction_index = (req, res) => {
    const post_id = req.baseUrl.split("/")[2];
    console.log(post_id, "POST ID");
    Interaction.find({ post_id })
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