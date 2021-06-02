import { Router } from 'express';
import * as express from 'express';
import { UserModel } from '../models/user';
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const User = require('../../dist/collections/user.js');

const router = Router();

router.get('/greeting', userController.greeting);

router.post(
  '/create',
  [
    body('email')
      .isEmail()
      .withMessage('insert valid email')
      .custom((value: String) => {
        return User.findOne({ email: value }).then((user: UserModel) => {
          if (user) {
            return Promise.reject('email already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('password is too short'),
  ],
  userController.createUser
);

router.get('/user/:userId', userController.getUserById);

router.put('/update', userController.updateUser);

module.exports = router;
