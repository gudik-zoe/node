import { Router } from 'express';
import * as express from 'express';
import { UserModel } from '../models/user';
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const User = require('../../dist/collections/user.js');
const isAuth = require('../middleware/isAuthenticated');

const router = Router();

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
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'i'
      )
      .withMessage('password should be much more complicated '),
  ],
  userController.createUser
);

router.get('/:userId', userController.getUserById);

router.put('/update', userController.updateUser);

router.get('/greeting', isAuth, (req, res, next) => {
  res.json("hello world it's ahtuenticated");
});

module.exports = router;
