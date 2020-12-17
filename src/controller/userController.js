const sharp = require('sharp')
const User = require('../model/Users')

const { updateValidator } = require('../utils/index')

module.exports = {
  registerUser: async (req, res) => {
    const user = new User(req.body)

    try {
      const token = await user.generateAuthToken()

      await user.save()
      res.status(200).send({ user, token })
    } catch (err) {
      res.status(400).send(err)
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()

      res.send({ user, token })
    } catch (err) {
      res.status(400).send()
    }
  },

  logoutUser: async (req, res) => {
    const { user, token: tokenToLogout } = req

    try {
      user.tokens = user.tokens.filter((token) => {
        return token.token !== tokenToLogout
      })

      await user.save()
      res.status(200).send()
    } catch (err) {
      res.status(500).send()
    }
  },

  logoutAllUser: async (req, res) => {
    const { user } = req

    try {
      user.tokens = []

      await user.save()
      res.status(200).send()
    } catch (err) {
      res.status(500).send()
    }
  },

  getUsers: async (req, res) => {
    res.send(req.user)
  },

  updateUser: async (req, res) => {
    const { body, user } = req
    const updates = Object.keys(body)

    const allowedUpdate = ['name', 'email', 'password', 'age']

    const isValidOperation = updateValidator(updates, allowedUpdate)

    if (!isValidOperation) {
      return res.status(400).send({ error: 'invalid Updates!' })
    }

    try {
      // const user = await User.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });

      updates.forEach((update) => (user[update] = body[update]))

      await user.save()

      res.status(200).send(user)
    } catch (err) {
      res.status(404).send(err)
    }
  },

  deleteUser: async (req, res) => {
    const { user } = req

    try {
      // const user = await User.findByIdAndRemove(_id);

      // if (!user) {
      //   return res.status(400).send({ error: 'user not found' });
      // }

      await user.remove()

      res.send(user)
    } catch (err) {
      res.status(400).send({ error: 'user not found' })
    }
  },

  uploadAvatar: async (req, res) => {
    const {
      file: { buffer },
      user,
    } = req

    try {
      const bufferResize = sharp(buffer).resize(250, 250).png().toBuffer()

      console.log(bufferResize)
      user.avatar = bufferResize
      await user.save()

      res.status(200).send({ success: 'ok', user })
    } catch (err) {
      res.status(400)
    }
  },
}
