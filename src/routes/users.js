const express = require('express')
const router= express.Router({mergeParams: true})
const {
        getUser,
        getUsers,
        createUser,
        updateUser,
        deleteUser } = require('../controllers/users')

const User = require('../models/User')     
const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')

router.use(protect)
router.use(authorize('admin'))

router.route('/')
      .get(advancedResults(User), getUsers)
      .post(createUser)


router.route('/:id')
      .get(getUser)      
      .put(updateUser)
      .delete(deleteUser)


module.exports = router      
