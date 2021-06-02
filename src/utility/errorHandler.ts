const { validationResult } = require('express-validator');
import { Error } from '../models/error';
import * as express from 'express';
exports.checkForError = (req: express.Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    return error;
  }
  return null;
};

exports.userNotFound = () => {
  const error = new Error('user not found');
  error.statusCode = 404;
  return error;
};
