const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.user_index);
router.post('/', userController.user_create_post);
router.get('/:id', userController.user_detail);
router.delete('/:id', userController.user_delete);

module.exports = router;