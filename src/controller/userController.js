const User = require('../model/Users');

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
};
