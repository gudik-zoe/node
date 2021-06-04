import { Router } from 'express';
import * as express from 'express';
import { UserModel } from '../models/user';
const postController = require('../controllers/postController');
const { body } = require('express-validator');
const User = require('../../dist/collections/user.js');
const Post = require('../../dist/collections/post.js');
const isAuth = require('../middleware/isAuthenticated');

const router = Router();

router.post('/create', isAuth, postController.createPost);

module.exports = router;
