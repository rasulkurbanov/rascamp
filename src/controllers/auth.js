const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const { use } = require('../routes/auth')


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

  sendTokenResponse(user, 200, res)

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

  sendTokenResponse(user, 200, res)
})

//@desc Get current logged in user
//@route GET /api/v1/auth/me
//access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res
    .status(200)
    .json({success: true, data: user})
})


//@desc Get reset password token
//@route POST /api/v1/auth/forgotpassword
//access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({email: req.body.email})

  if(!user) {
    return next(new ErrorResponse(`There is no user connected to this email`, 400))
  }

  let resetToken = user.getResetPasswordToken()

  console.log(resetToken)

  await user.save({validateBeforeSave: false})

  res
    .status(200)
    .json({success: true, data: user})
})


//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  

  //Creating token
  const token = user.getSignedJwtToken()

  const options = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({success: true, token})

}

