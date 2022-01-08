import { Router } from 'express';
const chatController = require('../controllers/chatController');
const { body } = require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();
const isAdmin = require('../middleware/isAdmin');

router.post('/', isAuthenticated, chatController.sendMessageToHelpCenter);
router.get('/rooms', isAdmin, chatController.getRooms);
router.get('/', isAuthenticated, chatController.getUserMessages);
module.exports = router;
