const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
//Loading env variables
const PORT = process.env.PORT || 5000
const bootcamps = require('./routes/bootcamps')
dotenv.config({ path: './config/config.env' })

const app = express()


//Development logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Mount using middleware
app.use('/api/v1/bootcamps', bootcamps)







app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} mode and on PORT: ${PORT}`))

