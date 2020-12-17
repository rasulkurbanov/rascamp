const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('./async')
const User = require('../models/User')


exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //Get token from req.headers.authorization
  if (req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }


  //Checking if token exists
  if (!token) {
    return next(new ErrorResponse(`Unauthorized to access this route`, 401))
  }

  try {
    //Verifying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id)

    next()
  }
  catch (err) {
    return next(new ErrorResponse(`Invalid token`, 401))
  }
})

//Check if user has permission to specific routes
exports.authorize = (...roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new ErrorResponse(`${req.user.role} has no permission to access`, 403))
      }
      next()
  }
}