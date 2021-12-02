const { validationResult } = require('express-validator');
import { CustomeError } from '../models/customError';
import * as express from 'express';

exports.checkForError = (req: express.Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMessage = [];
    for (let error of errors.array()) {
      errorsMessage.push(error.msg);
    }
    const error = new CustomeError(
      'validation failed',
      422,
      new Date(),
      errorsMessage
    );
    return error;
  }
  return null;
};

exports.notFound = (entity: string) => {
  const error = new CustomeError(entity + ' not found', 404, new Date(), []);
  return error;
};

exports.invalidCredentials = () => {
  const error = new CustomeError('invalid credentials', 400, new Date(), []);
  return error;
};

exports.notAuthenticated = () => {
  const error = new CustomeError('not authorised', 401, new Date(), []);
  return error;
};

exports.badRequest = () => {
  const error = new CustomeError('Bad Request', 404, new Date(), []);
  return error;
};

exports.tokenExpired = () => {
  const error = new CustomeError('not authorised', 401, new Date(), []);
  return error;
};
