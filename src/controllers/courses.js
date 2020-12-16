const Course = require('../models/Course')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')



//Ushbu controllerda agar params da bootcampId bo'lsa o'sha bootcampga tegishli course lar 
//ro'yxati chiqadi, yoqasam /api/v1/courses bo'yicha hamma kurslar chiqadi
//@desc GET all courses
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampId/courses
//access PUBLIC
exports.getCourses = asyncHandler( async(req, res, next) => {

  if(req.params.bootcampId) {
    const courses = await Course.find({bootcamp: req.params.bootcampId})

    res.status(200)
       .json({success: true, count: courses.length, data: courses})
  }
  else {
    res.status(200).json(res.advancedResults)
  }
})
//@desc Get a single course via id
//@route GET /api/v1/courses/:id 
//Access Public
exports.getCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if(!course) {
    res.status(400)
        .json({success: false, data: {}})
  }
  
  res.status(200)
     .json({success: true, data: course}) 
})

//@desc Add  course via 
//@route POST /api/v1/bootcamps/:bootcampId/courses
//Access Private
exports.addCourses = asyncHandler( async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId

  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if(!bootcamp) {
    return new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404)
  }


  const course = await Course.create(req.body)

  res.status(201)
     .json({success: true, data: course, msg: `Course successfully added`})
})




//@desc Update course 
//@route PUT /api/v1/courses/:id
//Access Private
exports.updateCourse = asyncHandler( async (req, res, next) => {

  let course = await Course.findById(req.params.id)

  if(!course) {
    return new ErrorResponse(`No course with the id of ${req.params.bootcampId}`, 404)
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(201)
     .json({success: true, data: course, msg: `Course successfully updated`})
})



//@desc Delete a course 
//@route DELETE /api/v1/courses/:id
//Access Private
exports.deleteCourse = asyncHandler( async (req, res, next) => {

  let course = await Course.findById(req.params.id)

  if(!course) {
    return new ErrorResponse(`No course with the id of ${req.params.bootcampId}`, 404)
  }

  course.remove()

  res.status(200)
     .json({success: true, data: {}, msg: `Course successfully deleted`})
})
