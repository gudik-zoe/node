import { Router } from 'express';
const cardController = require('../controllers/cardController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

router.get('/', isAuthenticated, cardController.getMyCart);

router.get('/cartLength', isAuthenticated, cardController.getMyCartLength);

router.put('/', isAuthenticated, cardController.modifyMyCard);

router.post('/', isAuthenticated, cardController.addItem);

router.delete('/:itemId', isAuthenticated, cardController.deleteItem);

module.exports = router;
