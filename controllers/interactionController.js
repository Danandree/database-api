const Interaction = require('../models/interaction');

const interaction_index = (req, res) => {
    const post_id = req.baseUrl.split("/")[2];
    console.log(post_id, "POST ID");
    Interaction.find({ post_id: post_id })
        .then((result) => {res.send(result);console.log(result, "RESULT")})
        .catch((err) => console.log(err));
}

const interaction_post = (req, res) => {
    const interaction = new Interaction(req.body.interaction);
    interaction.save()
        .then((result) => res.status(201).send(result))
        .catch((err) => console.log(err));
}

const interaction_delete = (req, res) => {
    Interaction.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.status(404).send(`Interaction with id "${req.params.id.toString()}"  not found`);
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.kind == 'ObjectId') {
                res.status(404).send(`Interaction id "${req.params.id.toString()}"  not valid`);
            }
        });
}

module.exports = { 
    interaction_post, 
    interaction_index,
    interaction_delete,
 }