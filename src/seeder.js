const mongoose = require('mongoose')
const fs = require('fs')
const Bootcamp = require('./models/Bootcamp')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})


let bootcamps  = JSON.parse(fs.readFileSync(path.join(__dirname, '/_data/bootcamps.json'), {encoding: 'utf-8'}))


//Import data to mongodb

async function importData() {
  try {
    await Bootcamp.create(bootcamps)

    console.log(`Bootcamps successfully created`)

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

    console.log(`Bootcamps deleted`)
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
