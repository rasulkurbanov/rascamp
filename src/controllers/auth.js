const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')


//@desc Register user
//@route POST /api/v1/auth/register
//access PUBLIC
exports.register = asyncHandler(async(req, res, next) => {
  res.status(201).json({success: true})
  console.log(req.body)
})

