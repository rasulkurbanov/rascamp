const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')
const path = require('path')

//@desc GET all bootcamps
//@route GET /api/v1/bootcamps
//access PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(res.advancedResults)

})

//@desc GET a single bootcamp
//@route GET /api/v1/bootcamps/:id
//access PUBLIC
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp within this id ${req.params.id} not found`, 404))
  }
  else {
    res
      .status(200)
      .json({ success: true, data: bootcamp })
  }
  // res
  //   .status(400)
  //   .json({success: false, msg: err.message})
})

//@desc POST a bootcamp
//@route POST /api/v1/bootcamps
//access PUBLIC
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  //Add user to req.body
  req.body.user = req.user.id

  //Checking published bootcamp
  let publishedBootcamp = await Bootcamp.findOne({ user: req.user.id })

  if (publishedBootcamp && req.body.user !== 'admin') {
    return next(
      new ErrorResponse(`Except admin others can not publish more than 1 bootcamp`, 400))
  }

  let bootcamp = await Bootcamp.create(req.body)

  res
    .status(201)
    .json({ success: true, data: bootcamp })
})

//@desc PUT a bootcamp
//@route PUT /api/v1/bootcamps/:id
//access PUBLIC
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

  let bootcamp = await Bootcamp.findById(req.params.id)

  if(!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with this id ${req.params.id}`, 400)
    )
  } 

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`This id ${req.user.id} is not an owner of bootcamp, thus can not update`, 400))
  }

  bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ success: true, data: bootcamp })
})

//@desc DELETE all bootcamps
//@route DELETE /api/v1/bootcamps
//access PUBLIC
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`)
    )
  }
  bootcamp.remove()
  res
    .status(200)
    .json({ success: true, msg: `Bootcamp deleted` })

})



//@desc Find bootcamp using radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//access PUBLIC
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
  const { distance, zipcode } = req.params

  //Get a latitude and longitude from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude
  const lng = loc[0].longitude


  //Calc radius using radius
  //Divide distance by radius of Earth
  //Earth radius = 3,963 mi / 6,378 km
  const radius = distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  })

  res
    .status(200)
    .json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    })


})



//@desc Upload a photo
//@route PUT /api/v1/bootcamps/:id/photo
//access Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }



  const file = req.files.file

  //Check if file is image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  //Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`, 400))
  }


  //Create a custom file name
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {

    if (err) {
      return next(new ErrorResponse(`Problem with uploading a file`, 500))
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name })


    res.status(200)
      .json({ success: true, data: file.name })
  })




})


