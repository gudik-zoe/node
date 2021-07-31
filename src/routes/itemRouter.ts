import { Router } from 'express';
const itemController = require('../controllers/itemsController');
const { body } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const router = Router();

router.get('/category/:category', itemController.getItems);

router.get('/:id', itemController.getItemById);

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
    body('price').notEmpty().withMessage('price field is required'),
    body('category').notEmpty().withMessage('category field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    body('ingredients').notEmpty().withMessage('ingredients field is required'),
  ],
  itemController.createItem
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
  itemController.updateItem
);

router.delete('/:id', isAdmin, itemController.deleteItem);

module.exports = router;
