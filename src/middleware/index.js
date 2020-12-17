const jwt = require('jsonwebtoken')
const multer = require('multer')

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

const upload = multer({
  dest: 'avatar',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a image file'))
    }

    cb(undefined, true)
  },
})

const errorHandler = (error, req, res, next) => {
  res.status(400).send({ error: error.message })
}

module.exports = {
  auth,
  upload,
  errorHandler,
}
