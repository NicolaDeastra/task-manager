const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.post('/', userController.postUser);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

module.exports = router;
