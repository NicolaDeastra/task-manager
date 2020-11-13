const express = require('express');

const userController = require('../controller/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/me', auth, userController.getUsers);

router.get('/:id', userController.getUser);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
