import { Router } from 'express';
const chatController = require('../controllers/chatController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();
<<<<<<< HEAD
const isAdmin = require('../middleware/isAdmin');

router.post('/', isAuthenticated, chatController.sendMessageToHelpCenter);
router.get('/rooms', isAdmin, chatController.getRooms);
router.get('/', isAuthenticated, chatController.getUserMessages);
=======

router.get('/', isAuthenticated, chatController.getMyConversation);

router.post('/', isAuthenticated, chatController.sendMessage);

// router.get('/cartLength', isAuthenticated, chatController.getMyCartLength);

// router.delete('/:itemId', isAuthenticated, cartController.deleteItem);

>>>>>>> c18981bb9ade9abaead31088a13c511a4b5541e9
module.exports = router;
