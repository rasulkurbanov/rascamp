const express = require('express')
const router = express.Router()
const courseRouter = require('./courses')
const { getBootcamp,
        getBootcamps,
        createBootcamp, 
        updateBootcamp, 
        deleteBootcamp,
        getBootcampInRadius,
        bootcampPhotoUpload } = require('../controllers/bootcamps')


//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/:id/photo')
      .put(bootcampPhotoUpload)

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp)

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)


router.route('/radius/:zipcode/:distance')
  .get(getBootcampInRadius)




  
module.exports = router