import { Router } from 'express';
const menuController = require('../controllers/menuController');
const { body } = require('express-validator');
const  isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')
const router = Router();

router.post(
  '/',
  [
    body('title')
      .trim()
      .isLength({ min: 9 })
      .withMessage('title is too short').notEmpty().withMessage("title shouldn't be null"),
    body('imageUrl').isURL().withMessage('image Url must be a valid url'),
    body('price').notEmpty().withMessage('this field is required'),
    body('description').notEmpty().withMessage('this field is required'),
    body('ingredients').notEmpty().withMessage('this field is required'),
  ],
  menuController.createMenu
);

router.get('/' ,menuController.getMenus);

router.get('/:menuId' ,menuController.getMenuById);

router.put('/' , [
  body('title')
    .trim()
    .isLength({ min: 9 })
    .notEmpty().withMessage("title is required")
    .withMessage('title is too short'),
  body('imageUrl').notEmpty().isURL().withMessage('image Url must be a valid url'),
  body('price').notEmpty().withMessage('this field is required'),
  body('description').notEmpty().withMessage('this field is required'),
  body('ingredients').notEmpty().withMessage('this field is required'),
], isAdmin , menuController.updateMenu);

router.delete('/:menuId' , isAdmin ,menuController.deleteMenu )

module.exports = router;
