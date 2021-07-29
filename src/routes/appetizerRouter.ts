import { Router } from 'express';
// import AbstractController from '../controllers/abstractController';
import appetizerController from '../controllers/appetizerController';
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');
const router = Router();
const appetizerMenu = require('../collections/appetizer');
const theClass = new appetizerController();
// router.post(
//   '/',
//   [
//     body('title')
//       .trim()
//       .isLength({ min: 9 })
//       .withMessage('title is too short').notEmpty().withMessage("title shouldn't be null"),
//     body('imageUrl').isURL().withMessage('image Url must be a valid url'),
//     body('price').notEmpty().withMessage('this field is required'),
//     body('description').notEmpty().withMessage('this field is required'),
//     body('ingredients').notEmpty().withMessage('this field is required'),
//   ],
//   menuController.createMenu
// );

router.get('/', theClass.showEntity);

// router.post('/', theClass.showEntity);

// router.get('/:menuId' ,menuController.getMenuById);

// router.put('/' , [
//   body('title')
//     .trim()
//     .isLength({ min: 9 })
//     .notEmpty().withMessage("title is required")
//     .withMessage('title is too short'),
//   body('imageUrl').notEmpty().isURL().withMessage('image Url must be a valid url'),
//   body('price').notEmpty().withMessage('this field is required'),
//   body('description').notEmpty().withMessage('this field is required'),
//   body('ingredients').notEmpty().withMessage('this field is required'),
// ], isAdmin , menuController.updateMenu);

// router.delete('/:menuId' , isAdmin ,menuController.deleteMenu )

module.exports = router;
