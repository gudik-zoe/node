import { Router } from 'express';
const cartController = require('../controllers/cartController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

router.get('/', isAuthenticated, cartController.getMyCart);

router.get('/cartLength', isAuthenticated, cartController.getMyCartLength);

router.post('/', isAuthenticated, cartController.addItem);

router.delete('/:itemId', isAuthenticated, cartController.deleteItem);

module.exports = router;
