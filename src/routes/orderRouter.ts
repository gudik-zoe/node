import { Router } from 'express';
const orderController = require('../controllers/orderController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');
const router = Router();

router.get('/', isAdmin, orderController.getOrders);

router.post('/', isAuthenticated, orderController.addOrder);

// router.delete('/:itemId', isAdmin, orderController.deleteItem);

module.exports = router;
