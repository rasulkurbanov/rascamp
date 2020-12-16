const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const path = require('path')
//Loading env variables
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

//Importing routes
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')


const app = express()

//Body parser
app.use(express.json())
//Development logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//File Upload middleware
app.use(fileUpload())

app.use(express.static(path.join(__dirname, 'public')))

connectDB()

//Mount using middleware
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)

app.use(errorHandler)




app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} mode and on PORT: ${PORT}`))

