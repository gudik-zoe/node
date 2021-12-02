var jwt = require('jsonwebtoken');
import * as express from 'express';
import { Role } from '../models/role';
const User = require('../collections/user');
const errorHandler = require('../utility/errorHandler');
const tokenDecoder = require('../utility/tokenDecoder');

module.exports = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = tokenDecoder.getUserIdFromToken(req);
    const theUser = await User.findById(userId);
    if (theUser && theUser.role !== Role.ADMIN) {
      throw errorHandler.notAuthenticated(
        'u should sign in as admin to do this'
      );
    }
  } catch (err) {
    next(err);
  }
  next();
};
