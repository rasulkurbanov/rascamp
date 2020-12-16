const express = require('express')
const router= express.Router({mergeParams: true})
const { getCourses, getCourse, addCourses, updateCourse, deleteCourse } = require('../controllers/courses')
const advancedResults = require('../middlewares/advancedResults')
const Course = require('../models/Course')
const { protect } = require('../middlewares/auth') 

router.route('/')
      .get(advancedResults(Course, {path: 'bootcamp', select: 'name description'}), getCourses)
      .post(protect, addCourses)

router.route('/:id')
      .get(getCourse)
      .put(protect, updateCourse)
      .delete(protect, deleteCourse)



module.exports = router