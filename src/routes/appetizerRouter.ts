import { Router } from 'express';
import AppetizerController from '../controllers/AppetizerController';
const { body } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const router = Router();
const appetizerController = new AppetizerController();

router.get('/', appetizerController.getMenus);

router.get('/:id', appetizerController.getMenuById);

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
  appetizerController.createMenu
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
  appetizerController.updateMenu
);

router.delete('/:id', isAdmin, appetizerController.deleteMenu);

module.exports = router;
