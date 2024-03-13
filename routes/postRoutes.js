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
router.get('/date/:date', postController.post_by_date);
// router.get('/:year/:month/:day', postController.post_by_date); <-- check

// INTERACTION ROUTES
// router.route('/:id/interaction').all(interactionRoutes);
router.use('/:id/interactions', interactionRoutes);
// router.use('/interaction', interactionRoutes);

module.exports = router;