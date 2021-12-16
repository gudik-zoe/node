import { Router } from 'express';
const chatController = require('../controllers/chatController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

router.get('/', isAuthenticated, chatController.getMyConversation);

router.post('/', isAuthenticated, chatController.sendMessage);

// router.get('/cartLength', isAuthenticated, chatController.getMyCartLength);

// router.delete('/:itemId', isAuthenticated, cartController.deleteItem);

module.exports = router;
