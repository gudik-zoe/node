import { Router } from 'express';
import express from 'express';
const userController = require('../controllers/userController');

const router = Router();

router.get('/greeting', userController.greeting);

router.post('/create', userController.createUser);

router.get('/user/:userId', userController.getUserById);

router.put('/update', userController.updateUser);

module.exports = router;
