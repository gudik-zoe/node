import * as express from 'express';
var jwt = require('jsonwebtoken');
const errorHandler = require('../utility/errorHandler');

exports.getUserIdFromToken = (req: express.Request) => {
  let authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, 'secrettissimo');
      return decodedToken.userId;
    } catch (err) {
      throw errorHandler.tokenExpired();
    }
  }
  throw errorHandler.notAuthenticated();
};

exports.verifyToken = (token: string) => {
  try {
    jwt.verify(token, 'secrettissimo');
  } catch (err) {
    throw errorHandler.tokenExpired();
  }
};
