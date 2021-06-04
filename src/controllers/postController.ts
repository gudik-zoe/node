import * as express from 'express';
import { Error } from '../models/error';
const { validationResult } = require('express-validator');
const errorHandler = require('../utility/errorHandler');
const Post = require('../../dist/collections/post.js');
const User = require('../../dist/collections/user.js');
const tokenDecoder = require('../utility/tokenDecoder');

exports.createPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const creatorId = tokenDecoder.getUserIdFromToken(req);
    let postBody = req.body;
    postBody.creator = creatorId;
    console.log(postBody);
    const post = new Post(postBody);
    const savedPost = await post.save();
    const user = await User.findById(creatorId);
    user.posts.push(post.id);
    const savedUser = await user.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};
