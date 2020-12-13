const Course = require('../models/Course')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')


//@desc GET all bootcamps
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/bootcampId/courses
//access PUBLIC
exports.getCourses = asyncHandler( async(req, res, next) => {
  
  let query;

  if(req.query.bootcampId) {
    query = Course.find(req.query.bootcampId)

    const courses = await query

    res.status(200)
       .json({success: true, data: courses})
  }
  else {
    query = Course.find()

    const courses = await query

    res.status(200)
       .json({success: true, data: courses})
  }
})