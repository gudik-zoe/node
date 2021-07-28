import { Router } from 'express';
import * as express from 'express';
import { UserModel } from '../models/user';
const postController = require('../controllers/postController');
const { body } = require('express-validator');
const User = require('../../dist/collections/user.js');
const Post = require('../../dist/collections/post.js');
const isAuth = require('../middleware/isAuthenticated');

const router = Router();

router.post(
  '/create',
  [
    body('text').trim().isLength({ min: 9 }).withMessage('text is too short'),
    body('imageUrl')
      .trim()
      .isLength({ min: 5 })
      .withMessage('image Url must be a valid url'),
  ],
  postController.createPost
);

router.get('/:postId', isAuth, postController.getPostById);

router.put(
  '/',
  isAuth,
  [
    body('text').trim().isLength({ min: 9 }).withMessage('text is too short'),
    body('imageUrl').trim(),
  ],
  postController.updatePost
);

router.delete('/:postId',  postController.deletePost);

module.exports = router;
