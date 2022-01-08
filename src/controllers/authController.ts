import { UserModel } from '../models/user';
import * as express from 'express';
import { LoginModel } from '../models/login';
import { SignUp } from '../models/signup';
import { EmailCredentials } from '../credentials/emailcredentials';
import { Role } from '../models/role';
import { ConfirmAuthentication } from '../models/confirmAuthentication';
const bcrypt = require('bcryptjs');
const errorHandler = require('../utility/errorHandler');
const User = require('../collections/user');
var jwt = require('jsonwebtoken');
const authUtility = require('../utility/authUtility');
const tokenDecoder = require('../utility/tokenDecoder');
const nodemailer = require('nodemailer');

exports.getUserData = async (  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
    try{
    const userData =  tokenDecoder.getUserData(req)
      if(userData){
        console.log(userData)
       res.status(200).json(userData);
      }
    }catch(err){
      next(err)
    }
  }

exports.authenticateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let receivedBody: SignUp = req.body;
  try {
    if (errorHandler.checkForError(req)) {
      throw errorHandler.checkForError(req);
    }
    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: EmailCredentials.host,
      auth: {
        user: EmailCredentials.email,
        pass: EmailCredentials.password,
      },
      secure: true,
    });
    const temporaryPassword = authUtility.randomStringGenerator();
    const mailData = {
      from: 'tonykhoury993@gmail.com', // sender address
      to: receivedBody.email, // list of receivers
      subject: 'register code',
      text: 'Hey ' + receivedBody.email,
      html: `<b>Hey there! </b>
    <br>use this code to enter the Service ${temporaryPassword} <br/>`,
    };
    const theUser = new User();
    theUser.email = receivedBody.email;
    const hashedPassword = await bcrypt.hash(receivedBody.password, 12);
    theUser.password = hashedPassword;
    theUser.temporaryPassword = temporaryPassword;
    theUser.temporaryPasswordCreationTs = new Date();
    theUser.firstName = receivedBody.firstName;
    theUser.lastName = receivedBody.lastName;
    theUser.role = Role.USER;
    const savedUser = await theUser.save();
    // if(savedUser) {

    // }
    transporter.sendMail(mailData, function (error: any, info: any) {
      if (error) {
        throw errorHandler.badRequest('email');
      } else {
        res.status(200).json('check your email ');
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.confirmAuthentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (errorHandler.checkForError(req) != null) {
      throw errorHandler.checkForError(req);
    }
    let receivedBody: ConfirmAuthentication = req.body;
    let theUser = await User.findOne({
      email: receivedBody.email,
    });
    if (!theUser) {
      throw errorHandler.notFound('user');
    }
    if (authUtility.checkUserTemporaryPassword(receivedBody, theUser)) {
      const token = jwt.sign(
        { userId: theUser.id },
        // { role: theUser.role },
        'secrettissimo',
        {
          expiresIn: '1h',
        }
      );
      theUser.temporaryPassword = '';
      theUser.temporaryPasswordCreationTs = undefined;
      const newUser = await theUser.save();
      res.status(200).json({ token });
    }
  } catch (err) {
    next(err);
  }
};

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
    const token = jwt.sign(
      { userId: theUser.id, role: theUser.role },
      'secrettissimo',
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({ token, role: theUser.role });
  } catch (err) {
    next(err);
  }
};
