const mongoose = require('mongoose')
const fs = require('fs')
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')
const User = require('./models/User')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})


let bootcamps  = JSON.parse(fs.readFileSync(path.join(__dirname, '/_data/bootcamps.json'), {encoding: 'utf-8'}))
let courses = JSON.parse(fs.readFileSync(path.join(__dirname, '/_data/courses.json'), {encoding: 'utf-8'}))
let users = JSON.parse(fs.readFileSync(path.join(__dirname, '/_data/users.json'), {encoding: 'utf-8'}))

//Import data to mongodb

async function importData() {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    await User.create(users)
    console.log(`Data successfully created`)

    process.exit()
  }
  catch(err) {
    console.log(err)
  }
}


//Delete data from mongodb
async function deleteData() {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()
    console.log(`Data deleted`)
    process.exit()
  }
  catch(err) {
    console.log(err)
  }
}



if(process.argv[2] === '-import') {
  importData()
}


if(process.argv[2] === '-delete') {
  deleteData()
}
