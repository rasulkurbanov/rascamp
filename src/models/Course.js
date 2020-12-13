const mongoose = require('mongoose')


const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add a course numbers per week']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition fee']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add minimum skill'],
    enum: ['beginner', 'pre-intermediate', 'intermediate', 'upper-intermediate', 'advanced','star']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
})



let Course = mongoose.model('Course', CourseSchema)



module.exports = Course