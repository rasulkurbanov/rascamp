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

const Bootcamp = require('../models/Bootcamp')

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')


//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/:id/photo')
      .put(protect,authorize('admin', 'publisher'), bootcampPhotoUpload)

router.route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect,authorize('admin', 'publisher'), createBootcamp)

router.route('/:id')
  .get(getBootcamp)
  .put( protect,authorize('admin', 'publisher'), updateBootcamp)
  .delete( protect,authorize('admin', 'publisher'), deleteBootcamp)


router.route('/radius/:zipcode/:distance')
  .get(getBootcampInRadius)




  
module.exports = router