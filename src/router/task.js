const express = require('express');
const Task = require('../models/Tasks');
const Tasks = require('../models/Tasks');

const router = express.Router();

router.post('/', (req, res) => {
  const task = new Tasks(req.body);

  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get('/', (req, res) => {
  Task.find({})
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Task.findById(id)
    .then((task) => {
      if (!task) {
        res.status(404).send();
      }

      res.send(task);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
