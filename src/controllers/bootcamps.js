const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')

//@desc GET all bootcamps
//@route GET /api/v1/bootcamps
//access PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  //Copying req.query
  const reqQuery = {...req.query}

  //Fields to exclude
  const removeFields = ['select', 'sort', 'limit', 'page']

  //Loop over removeFields 
  removeFields.forEach(param => delete reqQuery[param])


  //Creating query string
  let queryStr = JSON.stringify(reqQuery)
  
  //Create operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses')
  
  
  //Select fields
  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }
  
  //Sort
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  }
  else {
    query = query.sort('-createdAt')
  }
  
  //Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 20
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments()

  query = query.skip(startIndex).limit(limit)


  //Finding resources
  const bootcamps = await query

  //Pagination result
  const pagination = {}

  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if(startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }


  res
    .status(200)
    .json({ success: true, pagination,count: bootcamps.length, data: bootcamps })

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
  let bootcamp = await Bootcamp.create(req.body)

  res
    .status(201)
    .json({ success: true, data: bootcamp })
})

//@desc PUT a bootcamp
//@route PUT /api/v1/bootcamps/:id
//access PUBLIC
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
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

  if(!bootcamp) {
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
