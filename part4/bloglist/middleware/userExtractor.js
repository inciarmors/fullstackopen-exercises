const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  const token = request.token
  
  if (!token) {
    request.user = null
    return next()
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!decodedToken.id) {
      request.user = null
    } else {
      request.user = await User.findById(decodedToken.id)
    }
  } catch (error) {
    request.user = null
  }
  
  next()
}

module.exports = { userExtractor }
