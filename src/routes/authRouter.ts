import { Router } from 'express';
import { UserModel } from '../models/user';
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/isAuthenticated');
const { body } = require('express-validator');
const User = require('../../dist/collections/user.js');
const router = Router();


router.get('/userData', isAuthenticated ,authController.getUserData);
router.post(
  '/authenticateUser',
  [
    body('firstName')
      .trim()
      .isLength({ min: 2 })
      .withMessage('first name is too short')
      .notEmpty()
      .withMessage('first name should have a value'),
    body('lastName')
      .trim()
      .isLength({ min: 2 })
      .withMessage('last name is too short')
      .notEmpty()
      .withMessage('last name should have a value'),
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

router.post('/confirmauthentication', authController.confirmAuthentication);

module.exports = router;
