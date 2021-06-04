var jwt = require('jsonwebtoken');
import * as express from 'express';
const errorHandler = require('../utility/errorHandler');

module.exports = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader: string | undefined = req.get('Authorization');
  let decodedToken: any;
  if (!authHeader) {
    throw errorHandler.notAuthenticated();
  }
  const token = authHeader.split(' ')[1];
  try {
    decodedToken = jwt.verify(token, 'secrettissimo');
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
  if (!decodedToken) {
    throw errorHandler.notAuthenticated();
  }
  next();
};