const express = require('express');

const userController = require('../controller/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/logout', auth, userController.logoutUser);

router.post('/logout/all', auth, userController.logoutAllUser);

router.get('/me', auth, userController.getUsers);

router.patch('/me', auth, userController.updateUser);

router.delete('/me', auth, userController.deleteUser);

module.exports = router;
