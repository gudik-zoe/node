import { Router } from 'express';
import MenuController from '../controllers/MenuController';
const { body } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const router = Router();
const menuController = new MenuController();

router.get('/', menuController.getMenus);

router.get('/:id', menuController.getMenuById);

router.post(
  '/',
  isAdmin,
  [
    body('title')
      .trim()
      .isLength({ min: 9 })
      .withMessage('title is too short')
      .notEmpty()
      .withMessage("title shouldn't be null"),
    body('imageUrl').isURL().withMessage('image Url must be a valid url'),
    body('price').notEmpty().withMessage('this field is required'),
    body('description').notEmpty().withMessage('this field is required'),
    body('ingredients').notEmpty().withMessage('this field is required'),
  ],
  menuController.createMenu
);

router.put(
  '/',
  isAdmin,
  [
    body('title')
      .trim()
      .isLength({ min: 9 })
      .withMessage('title is too short')
      .notEmpty()
      .withMessage("title shouldn't be null"),
    body('imageUrl').isURL().withMessage('image Url must be a valid url'),
    body('price').notEmpty().withMessage('this field is required'),
    body('description').notEmpty().withMessage('this field is required'),
    body('ingredients').notEmpty().withMessage('this field is required'),
  ],
  menuController.updateMenu
);

router.delete('/:id', isAdmin, menuController.deleteMenu);

module.exports = router;
