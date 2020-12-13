const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

//@desc GET all bootcamps
//@route GET /api/v1/bootcamps
//access PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find()
    
    res
      .status(200)
      .json({success: true, count: bootcamps.length ,data: bootcamps})

})

//@desc GET a single bootcamp
//@route GET /api/v1/bootcamps/:id
//access PUBLIC
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp within this id ${req.params.id} not found`, 404))
    }
    else {
      res
        .status(200)  
        .json({success: true, data: bootcamp})
    }
    // res
    //   .status(400)
    //   .json({success: false, msg: err.message})
})

//@desc POST a bootcamp
//@route POST /api/v1/bootcamps
//access PUBLIC
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.create(req.body)

    res
      .status(201)
      .json({success: true, data: bootcamp})
})

//@desc PUT a bootcamp
//@route PUT /api/v1/bootcamps/:id
//access PUBLIC
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({success: true, data: bootcamp})
})

//@desc DELETE all bootcamps
//@route DELETE /api/v1/bootcamps
//access PUBLIC
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    res
      .status(200)  
      .json({success: true, msg: `Bootcamp deleted`})

}) 

