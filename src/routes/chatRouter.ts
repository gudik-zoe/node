import { Router } from 'express';
const chatController = require('../controllers/chatController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

const isAdmin = require('../middleware/isAdmin');

router.post('/', isAuthenticated, chatController.sendMessageToHelpCenter);

router.get('/rooms', isAdmin, chatController.getRooms);

router.post('/rooms/:roomId', isAdmin, chatController.respondeToCustomer);
router.get('/rooms/:roomId', isAuthenticated, chatController.getRoomById);

router.get('/', isAuthenticated, chatController.getUserRoom);

// router.post('/', isAuthenticated, chatController.sendMessage);

module.exports = router;
