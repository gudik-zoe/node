import * as express from 'express';
var jwt = require('jsonwebtoken');
const errorHandler = require('../utility/errorHandler');
exports.getUserIdFromToken = (req: express.Request) => {
  let authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secrettissimo');
    return decodedToken.userId;
  }
  throw errorHandler.notAuthenticated();
};
