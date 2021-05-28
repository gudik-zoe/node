import { UserModel } from '../models/user';
import * as express from 'express';
import { Error } from '../models/error';

const User = require('../collections/user');

exports.greeting = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(200).json('hello world');
};

exports.createUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const receivedBody: UserModel = req.body;
    const theUser = new User(receivedBody);
    const savedUser = await theUser.save();
    console.log(savedUser);
    return res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = req.params.userId;
    const theUser = await User.findById(userId);
    if (!theUser) {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(theUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const receivedBody = req.body;
    console.log(receivedBody);
    let theUser = await User.findById(receivedBody.id);
    if (!theUser) {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    }

    const updatedUser = await theUser.save();
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
