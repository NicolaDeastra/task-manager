const express = require('express');

const auth = require('../middleware/auth');
const taskController = require('../controller/taskController');

const router = express.Router();

router.post('/', auth, taskController.postTask);

router.get('/', taskController.getTasks);

router.get('/:id', taskController.getTask);

router.patch('/:id', taskController.postTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
