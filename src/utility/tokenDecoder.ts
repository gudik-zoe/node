import * as express from 'express';
var jwt = require('jsonwebtoken');
import { Error } from '../models/error';
exports.getUserIdFromToken = (req: express.Request) => {
  let authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secrettissimo');
    return decodedToken.userId;
  }
  const error = new Error('not authorised ');
  error.statusCode = 401;
  throw error;
};
