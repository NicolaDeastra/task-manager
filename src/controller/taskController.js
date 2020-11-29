const Task = require('../model/Tasks')

const { updateValidator } = require('../utils/index')

module.exports = {
  postTask: async (req, res) => {
    const {
      body,
      user: { _id },
    } = req
    // const task = new Task(req.body);

    const task = new Task({
      ...body,
      owner: _id,
    })

    try {
      await task.save()
      res.status(200).send(task)
    } catch (err) {
      res.status(400).send(err)
    }
  },

  getTasks: async (req, res) => {
    const { completed, limit, skip, sortBy } = req.query

    const match = {}
    const sort = {}

    if (completed) {
      match.completed = completed === 'true'
    }

    if (sortBy) {
      const parts = sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
      const user = await req.user
        .populate({
          path: 'tasks',
          match,
          options: {
            limit: parseInt(limit),
            skip: parseInt(skip),
            sort,
          },
        })
        .execPopulate()

      res.send(user.tasks)
    } catch (err) {
      res.status(400).send(err)
    }
  },

  getTask: async (req, res) => {
    const {
      params: { id: _id },
      user: { _id: owner },
    } = req

    try {
      // const task = await Task.findById(id);
      const task = await Task.findOne({ _id, owner })

      if (!task) {
        return res.status(404).send()
      }

      res.status(200).send(task)
    } catch (err) {
      res.status(400).send(err)
    }
  },

  updateTask: async (req, res) => {
    const {
      params: { id: _id },
      user: { _id: owner },
      body,
    } = req

    const updates = Object.keys(body)

    const allowedUpdate = ['description', 'completed']

    const isValidOperation = updateValidator(updates, allowedUpdate)

    if (!isValidOperation) {
      return res.status(400).send({ error: 'invalid Updates!' })
    }

    try {
      // const task = await Task.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });
      // const task = await Task.findById(id)

      const task = await Task.findOne({ _id, owner })

      if (!task) {
        return res.status(404).send()
      }

      updates.forEach((update) => (task[update] = body[update]))

      await task.save()

      res.status(200).send(task)
    } catch (err) {
      res.status(404).send({ error: 'invalid Update id not found' })
    }
  },

  deleteTask: async (req, res) => {
    const {
      params: { id: _id },
      user: { _id: owner },
    } = req

    try {
      const task = await Task.findOneAndDelete({ _id, owner })

      if (!task) {
        return res.status(404).send()
      }

      res.send({ success: 'success delete task' })
    } catch (err) {
      res.send({ error: 'task not found' })
    }
  },
}
