const User = require('../model/Users');

const { updateValidator } = require('../utils/index');

module.exports = {
  postUser: async (req, res) => {
    const user = new User(req.body);

    try {
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updateUser: async (req, res) => {
    const {
      params: { id },
      body,
    } = req;

    const allowedUpdate = ['name', 'email', 'password', 'age'];

    const isValidOperation = updateValidator(body, allowedUpdate);

    if (!isValidOperation) {
      return res.status(400).send({ error: 'invalid Updates!' });
    }

    try {
      const user = await User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });

      res.status(200).send(user);
    } catch (err) {
      res.status(404).send({ error: 'invalid Update id not found' });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByIdAndRemove(id);

      if (!user) {
        return res.status(400).send({ error: 'user not found' });
      }

      res.send(user);
    } catch (err) {
      res.status(400).send({ error: 'user not found' });
    }
  },
};
