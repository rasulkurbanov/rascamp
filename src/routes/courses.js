const express = require('express')
const router= express.Router({mergeParams: true})
const {getCourses} = require('../controllers/courses')
const { route } = require('./bootcamps')



router.route('/')
      .get(getCourses)





module.exports = router