import { Router } from 'express';
import { UserModel } from '../models/user';
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const User = require('../../dist/collections/user.js');
const router = Router();
router.post(
  '/authenticateUser',
  [
    body('email')
      .isEmail()
      .withMessage('insert valid email')
      .custom((value: String) => {
        return User.findOne({ email: value }).then((user: UserModel) => {
          if (user) {
            console.log(user.email);
            return Promise.reject('email already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'i'
      )
      .withMessage('password should have at least 2 alphanumeric characters'),
  ],
  authController.authenticateUser
);
router.post('/login', authController.login);

module.exports = router;
