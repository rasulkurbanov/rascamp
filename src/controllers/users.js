const User = require('../models/Bootcamp')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const advancedResults = require('../middlewares/advancedResults')

//@desc Get all users
//@route GET /api/v1/users
//@access Private/Admin
exports.getUsers = asyncHandler(async(req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@desc Get a single user
//@route GET /api/v1/users/:id
//@access Private/Admin
exports.getUser = asyncHandler(async(req, res, next) => {
  const user = User.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: user
  })
})


//@desc Create  a user
//@route POST /api/v1/users
//@access Private/Admin
exports.createUser = asyncHandler(async(req, res, next) => {
  const user = await User.create(req.body)

  res.status(200).json({
    success: true,
    data: user
  })
})


//@desc Update  a user
//@route PUT /api/v1/users/:id
//@access Private/Admin
exports.updateUser = asyncHandler(async(req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    
  })

  res.status(200).json({
    success: true,
    data: user
  })
})

  
