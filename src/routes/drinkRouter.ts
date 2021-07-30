import { Router } from 'express';
import DrinkController from '../controllers/DrinkController';
const { body } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const router = Router();
const drinkController = new DrinkController();

router.get('/', drinkController.getMenus);

router.get('/:id', drinkController.getMenuById);

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
  drinkController.createMenu
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
  drinkController.updateMenu
);

router.delete('/:id', isAdmin, drinkController.deleteMenu);

module.exports = router;
