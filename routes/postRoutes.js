const express = require('express');
const router = express.Router();

const interactionRoutes = require('./interactionRoutes');

const postController = require('../controllers/postController');

router.get('/', postController.post_index);
router.post('/', postController.post_create_post);
router.get('/:id', postController.post_detail);
router.delete('/:id', postController.post_delete);
router.patch('/:id', postController.post_update);
router.put('/:id', postController.post_update);

// INTERACTION ROUTES
router.use('/:id/interactions', interactionRoutes);

module.exports = router;