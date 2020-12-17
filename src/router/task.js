const express = require('express')

const { auth } = require('../middleware')
const taskController = require('../controller/taskController')

const router = express.Router()

router.post('/', auth, taskController.postTask)
router.get('/', auth, taskController.getTasks)
router.get('/:id', auth, taskController.getTask)
router.patch('/:id', auth, taskController.updateTask)
router.delete('/:id', auth, taskController.deleteTask)

module.exports = router
