const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')


//@desc Register user
//@route POST /api/v1/auth/register
//access PUBLIC
exports.register = asyncHandler(async(req, res, next) => {
  const {name, email, role, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    role
  })

  res.status(201).json({success: true, data: user})
})

