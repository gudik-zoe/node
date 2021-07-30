import { Router } from 'express';
import DessertController from '../controllers/DessertController';
const { body } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const router = Router();
const dessertController = new DessertController();

router.get('/', dessertController.getMenus);

router.get('/:id', dessertController.getMenuById);

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
  dessertController.createMenu
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
  dessertController.updateMenu
);

router.delete('/:id', isAdmin, dessertController.deleteMenu);

module.exports = router;
