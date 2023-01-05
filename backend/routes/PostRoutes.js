const express = require('express');
const router = express.Router();
const {
  addPost,
  getPosts,
  replyOnPost,
} = require('../controllers/PostController');

router.post('/', addPost);
router.get('/:courseId', getPosts);
router.patch('/:postId', replyOnPost);

module.exports = router;
