const mongoose = require('mongoose')

const connectDB = async () => {
    try {
      let response = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      console.log(`Successfully connected to mongodb through ${response.connection.host}`)
    }
    catch(err) {
      console.log(err)
    }
  }

module.exports = connectDB