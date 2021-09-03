import * as express from 'express';
var jwt = require('jsonwebtoken');
const errorHandler = require('../utility/errorHandler');
exports.getUserIdFromToken = (req: express.Request) => {
  let authHeader = req.get('Authorization');
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secrettissimo');
    console.log(decodedToken.userId);
    return decodedToken.userId;
  }
  throw errorHandler.notAuthenticated();
};
