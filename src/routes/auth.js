const express = require('express')
const router = express.Router()
const { register, login, getMe, forgotPassword, resetPassword } = require('../controllers/auth')


router.route('/register')
      .post(register)

router.route('/login')
      .post(login)

router.route('/getme') 
      .get(getMe)      

router.route('/forgotpassword')
      .post(forgotPassword)      

router.route('/resetpassword/:resettoken', resetPassword)

module.exports = router