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

  const token = user.getSignedJwtToken()

  res.status(201).json({success: true, data: user, token})
})



//@desc Login user
//@route POST /api/v1/auth/login
//access PUBLIC
exports.login = asyncHandler(async(req, res, next) => {
  const {email, password } = req.body

  if(!email || !password) {
    return next(new ErrorResponse(`Please enter password or email`, 400))
  }

  //Checking if user exists
  const user = await User.findOne({email: email}).select('+password')

  if(!user) {
    return next(new ErrorResponse(`Incorrect password or email`), 401)
  }

  //Checking password matches with password stored in DB
  const isMatch = await user.checkPassword(password)

  if(!isMatch) {
    return next(new ErrorResponse(`Incorrect password or email`, 401))
  }

  //Creating token
  const token = user.getSignedJwtToken()

  res.status(201).json({success: true, token})
})
