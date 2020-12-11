const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
//Loading env variables
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000
const bootcamps = require('./routes/bootcamps')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')


const app = express()

//Body parser
app.use(express.json())
//Development logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

connectDB()

//Mount using middleware
app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler)



app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} mode and on PORT: ${PORT}`))

