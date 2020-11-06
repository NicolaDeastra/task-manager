const express = require('express');
const User = require('../models/Users');

const router = express.Router();

router.post('/', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send();
      }

      res.send(user);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
