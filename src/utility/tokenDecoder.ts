import * as express from 'express';
import { IncomingHttpHeaders } from 'http';
var jwt = require('jsonwebtoken');
const errorHandler = require('../utility/errorHandler');


function getTokenFromHeader(header:express.Request){
  let authHeader = header.get('Authorization');
  try {
  if (authHeader) {
    const token = authHeader.split(' ')[1];
   const decodedToken =  jwt.verify(token, 'secrettissimo');
    return decodedToken;
  }
    }catch(err){
      throw err;
    }
}


exports.getUserIdFromToken = (req: express.Request) => {
    try {
   const decodedToken =  getTokenFromHeader(req)
   if(decodedToken){
     return decodedToken.userId;
   }
    } catch (err) {
      throw errorHandler.tokenExpired();
    }
  
};

// exports.verifyToken = (token: string) => {
//   try {
//     jwt.verify(token, 'secrettissimo');
//   } catch (err) {
//     throw errorHandler.tokenExpired();
//   }
// };

exports.getUserRole = (req: express.Request) =>{
  const decodedToken = getTokenFromHeader(req)
   decodedToken.role ? decodedToken.role:null
}
