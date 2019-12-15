const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPost)
  .post(authController.protect, postController.addAPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    postController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    postController.deletePost
  );

module.exports = router;
