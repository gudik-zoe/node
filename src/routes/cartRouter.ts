import { Router } from 'express';
const cartController = require('../controllers/cartController');
const { body } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const router = Router();
// const dessertController = new DessertController();

// router.get('/', dessertController.getMenus);

router.post('/', cartController.addItem);

module.exports = router;
