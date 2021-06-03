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

exports.invalidCredentials = () => {
  const error = new Error('invalid credentials');
  error.statusCode = 400;
  return error;
};

exports.notAuthenticated = () => {
  const error = new Error('not authorised');
  error.statusCode = 401;
  return error;
};
