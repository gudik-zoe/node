var jwt = require('jsonwebtoken');
import * as express from 'express';
const User = require('../collections/user');
const errorHandler = require('../utility/errorHandler');
const tokenDecoder = require('../utility/tokenDecoder');

module.exports = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader: string | undefined = req.get('Authorization');
  let decodedToken: any;
  if (!authHeader) {
    throw errorHandler.notAuthenticated();
  }
  // const token = authHeader.split(' ')[1];
  // try {
  //   decodedToken = jwt.verify(token, 'secrettissimo');
  // } catch (err) {
  //   err.statusCode = 400;
  //   throw err;
  // }
  // if (!decodedToken) {
  //   throw errorHandler.notAuthenticated();
  // }
  const userId = tokenDecoder.getUserIdFromToken(req);
  console.log(userId)
  const theUser = await User.findById(userId);
  try{
    if(theUser.role !== 'admin'){
      console.log("he is not an admin")
      throw errorHandler.notAuthenticated();
    }
  }catch(err){
      next(err)
  }
  next();
};
