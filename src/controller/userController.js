const User = require('../model/Users');

const { updateValidator } = require('../utils/index');

module.exports = {
  registerUser: async (req, res) => {
    const user = new User(req.body);

    try {
      const token = await user.generateAuthToken();

      await user.save();
      res.status(200).send({ user, token });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();

      res.send({ user, token });
    } catch (err) {
      res.status(400).send();
    }
  },

  getUsers: async (req, res) => {
    res.send(req.user);
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
    const updates = Object.keys(body);

    const allowedUpdate = ['name', 'email', 'password', 'age'];

    const isValidOperation = updateValidator(updates, allowedUpdate);

    if (!isValidOperation) {
      return res.status(400).send({ error: 'invalid Updates!' });
    }

    try {
      // const user = await User.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });

      const user = await User.findById(id);

      updates.forEach((update) => (user[update] = body[update]));

      await user.save();

      res.status(200).send(user);
    } catch (err) {
      res.status(404).send(err);
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
