import { Router } from 'express';
const orderController = require('../controllers/orderController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');
const router = Router();

router.get('/all', orderController.getAllOrders);

router.get('/', isAuthenticated, orderController.getMyOrders);

router.post('/', isAuthenticated, orderController.addOrder);

router.put(
  '/:orderId',
  //  isAdmin
  orderController.editOrderStatus
);

router.delete('/:orderId', isAdmin, orderController.deleteOrder);

module.exports = router;
