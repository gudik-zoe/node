import { Router } from 'express';
const menuController = require('../controllers/menuController');
const { body } = require('express-validator');
const  isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')
const router = Router();

router.post(
  '/createMenu',
  [
    body('title')
      .trim()
      .isLength({ min: 9 })
      .notEmpty()
      .withMessage('title is too short'),
    body('imageUrl').isURL().withMessage('image Url must be a valid url'),
    body('price').notEmpty().withMessage('this field is required'),
    body('description').notEmpty().withMessage('this field is required'),
    body('ingredients').notEmpty().withMessage('this field is required'),
  ],
  menuController.createMenu
);

router.get('/', isAuthenticated , isAdmin,menuController.getMenus);
module.exports = router;
