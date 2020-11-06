const express = require('express');

const taskController = require('../controller/taskController');

const router = express.Router();

router.post('/', taskController.postTask);

router.get('/', taskController.getTasks);

router.get('/:id', taskController.getTask);

module.exports = router;
