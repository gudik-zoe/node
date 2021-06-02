import { UserModel } from '../models/user';
import * as express from 'express';
import { Error } from '../models/error';
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const errorHandler = require('../utility/errorHandler');
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
    if (errorHandler.checkForError(req) != null) {
      throw errorHandler.checkForError(req);
    }
    let receivedBody: UserModel = req.body;
    const hashedPassword = await bcrypt.hash(receivedBody.password, 12);
    receivedBody.password = hashedPassword;
    const theUser = new User(receivedBody);
    const savedUser = await theUser.save();
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
      throw errorHandler.userNotFound();
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
    const receivedBody: UserModel = req.body;
    let theUser = await User.findById(receivedBody.id);
    if (!theUser) {
      throw errorHandler.userNotFound();
    }
    const updatedUser = await theUser.save();
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
