const express = require('express');
const router = express.Router();

const interactionController = require('../controllers/interactionController');

router.get('/', interactionController.interaction_index);
router.post('/', interactionController.interaction_post);
router.delete('/:id', interactionController.interaction_delete);

module.exports = router;