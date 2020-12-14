const express = require('express')
const router= express.Router({mergeParams: true})
const { getCourses, getCourse, addCourses, updateCourse, deleteCourse } = require('../controllers/courses')



router.route('/')
      .get(getCourses)
      .post(addCourses)

router.route('/:id')
      .get(getCourse)
      .put(updateCourse)
      .delete(deleteCourse)



module.exports = router