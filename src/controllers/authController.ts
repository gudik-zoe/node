import { UserModel } from '../models/user';
import * as express from 'express';
import { LoginModel } from '../models/login';
const bcrypt = require('bcryptjs');
const errorHandler = require('../utility/errorHandler');
const User = require('../collections/user');
var jwt = require('jsonwebtoken');

exports.login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const receivedBody: LoginModel = req.body;
    const theUser: UserModel = await User.findOne({
      email: receivedBody.email,
    });
    if (!theUser) {
      throw errorHandler.invalidCredentials();
    }
    const passwordIsvalid = await bcrypt.compare(
      receivedBody.password,
      theUser.password
    );
    if (!passwordIsvalid) {
      throw errorHandler.invalidCredentials();
    }
    console.log('password and mail are valid mabrouuk!');
    const token = jwt.sign({ userId: theUser.id }, 'secrettissimo', {
      expiresIn: '1h',
    });
    res.status(200).json({ token: token, userId: theUser.id.toString() });
  } catch (err) {
    next(err);
  }
};
