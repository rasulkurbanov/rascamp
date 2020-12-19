const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth')
const { register,
        login,
        getMe,
        forgotPassword,
        resetPassword,
        updateDetails, 
        updatePassword } = require('../controllers/auth')


router.route('/register')
      .post(register)

router.route('/login')
      .post(login)

router.route('/getme')  
      .get(protect, getMe)      

router.route('/forgotpassword')
      .post(forgotPassword)      

router.route('/resetpassword/:resettoken')
      .post(resetPassword)

router.route('/updatedetails')
      .put(protect, updateDetails)

router.route('/updatepassword').put(protect, updatePassword)

module.exports = router