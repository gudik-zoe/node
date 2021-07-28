import * as express from 'express';
import { Error } from '../models/error';
import { PostModel } from '../models/post';
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
    if (errorHandler.checkForError(req) != null) {
      throw errorHandler.checkForError(req);
    }
    // const creatorId = tokenDecoder.getUserIdFromToken(req);
    let postBody = req.body;
     postBody.creator = 2;
    const post = new Post(postBody);
    const savedPost = await post.save();
    // const user = await User.findById(creatorId);
    // user.posts.push(post.id);
    // const savedUser = await user.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const thePost = await Post.findById(req.params.postId);
    if (!thePost) {
      console.log('here');
      throw errorHandler.notFound('post');
    }
    res.status(200).json(thePost);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (errorHandler.checkForError(req) != null) {
      throw errorHandler.checkForError(req);
    }
    const receivedBody: PostModel = req.body;
    let oldPost = await Post.findById(receivedBody.id);
    if (!oldPost) {
      throw errorHandler.notFound('post');
    }
    oldPost = { ...receivedBody };
    const newPost = await oldPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const postId = req.params.postId;
    const userId = tokenDecoder.getUserIdFromToken(req);
    const theRequestedPost: PostModel = await Post.findById(postId);
    if (userId.toString() !== theRequestedPost.creator.toString()) {
      throw errorHandler.notAuthenticated();
    }
    const relatedUser = await User.findById(userId);
    const deletedPost = await Post.findByIdAndRemove(postId);
    relatedUser.posts.pull(postId);
    const savedUser = await relatedUser.save();
    res.status(200).json({ message: 'post deleted successfully' });
  } catch (err) {
    next(err);
  }
};
