const express = require('express')
const router = express.Router()
const { register, login, getMe, forgotPassword } = require('../controllers/auth')


router.route('/register')
      .post(register)

router.route('/login')
      .post(login)

router.route('/getme') 
      .get(getMe)      

router.route('/forgotpassword')
      .post(forgotPassword)      

module.exports = router