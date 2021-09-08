const { validationResult } = require('express-validator');
import { Error } from '../models/error';
import * as express from 'express';

exports.checkForError = (req: express.Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    const errorsMessage = [];
    for (let error of errors.array()) {
      errorsMessage.push(error.msg);
    }
    error.data = errorsMessage;
    return error;
  }
  return null;
};

exports.notFound = (entity: string) => {
  const error = new Error(entity + ' not found');
  error.statusCode = 404;
  return error;
};

exports.invalidCredentials = () => {
  const error = new Error('invalid credentials');
  error.statusCode = 400;
  return error;
};

exports.notAuthenticated = (
  message: string = 'please sign in to be able to do this activity'
) => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};

exports.badRequest = (message: string = 'bad request') => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

exports.tokenExpired = (message: string = 'token expired') => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};
