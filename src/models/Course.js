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

//
CourseSchema.statics.getAverageCost = async function(bootcampId) {
  const obj = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' }
      }
    }
  ]).allowDiskUse(true);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    })
  }
  catch(err) {
    console.log(err)
  }
};



//Call getAverageCost after save 
CourseSchema.post('save', function() {
  this.constructor.getAverageCost(this.bootcamp)
})


//Call getAverageCost before remove
CourseSchema.pre('remove', function() {
  this.constructor.getAverageCost(this.bootcamp)
})





let Course = mongoose.model('Course', CourseSchema)



module.exports = Course