const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('./async')
const User = require('../models/User')


exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //Get token from req.headers.authorization
  if(req.headers.authorization &&
     req.headers.authorization.startsWith('Beaver')) {
       token = req.headers.authorization.split(' ')[1]
     } 

  //Checking if token exists
  if(!token) {
    return next(new ErrorResponse(`Unauthorized to access this route`, 401))
  }

  try {
    //Verifying token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(decoded)

    req.user =  await User.findById(decoded.id)

    next()
  }
  catch(err) {
    return next(new ErrorResponse(`Invalid token`, 401))
  }
})