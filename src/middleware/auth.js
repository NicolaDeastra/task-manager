const jwt = require('jsonwebtoken')
const User = require('../model/Users')

const auth = async (req, res, next) => {
  const secret = process.env.SECRET

  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, secret)
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (err) {
    res.send({ error: 'Please authenticate.' }).status(401)
  }
}

module.exports = auth
