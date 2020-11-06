const Task = require('../model/Tasks');

module.exports = {
  postTask: async (req, res) => {
    const task = new Tasks(req.body);

    try {
      await task.save();
      res.status(200).send(task);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getTask: async (req, res) => {
    const { id } = req.params;

    try {
      const task = await Task.findById(id);
      res.status(200).send(task);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
