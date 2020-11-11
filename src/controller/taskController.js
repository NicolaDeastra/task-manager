const Task = require('../model/Tasks');

const { updateValidator } = require('../utils/index');

module.exports = {
  postTask: async (req, res) => {
    const task = new Task(req.body);

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

  updateTask: async (req, res) => {
    const {
      params: { id },
      body,
    } = req;

    const updates = Object.keys(body);

    const allowedUpdate = ['description', 'completed'];

    const isValidOperation = updateValidator(updates, allowedUpdate);

    if (!isValidOperation) {
      return res.status(400).send({ error: 'invalid Updates!' });
    }

    try {
      // const task = await Task.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });
      const task = await Task.findById(id);

      updates.forEach((update) => (task[update] = body[update]));

      await task.save();

      res.status(200).send(task);
    } catch (err) {
      res.status(404).send({ error: 'invalid Update id not found' });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;

    try {
      await Task.findByIdAndDelete(id);

      res.send({ success: 'success delete task' });
    } catch (err) {
      res.send({ error: 'task not found' });
    }
  },
};
