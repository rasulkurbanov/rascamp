const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { userInfo } = require('os')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please add a name`]
  },
  email: {
    type: String,
    required: [true, `Please add an email`],
    unique: true,
    match: [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 
      "Please add a valid email"
    ]
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, `Please add a strong password`],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})



//Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//Sign with JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({id: this._id, name: this.name}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

//Checking password
UserSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

//Reset token with crypto and return 
UserSchema.methods.getResetPasswordToken = async function() {
  //Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  //Set expire
  this.resetPasswordExpire = Date.now() + 0 * 60 * 1000

  return resetToken

}


const User = mongoose.model('User', UserSchema)

module.exports = User