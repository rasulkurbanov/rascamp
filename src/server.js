const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
//Loading env variables
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000


//Importing routes
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')

const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')


const app = express()

//Body parser
app.use(express.json())
//Development logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//MongoSanitize
app.use(mongoSanitize())

//Setting app security using helmet
app.use(helmet())

//Sanitizing user input threads
app.use(xss())

//Setting limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1
})
//apply to all request
app.use(limiter)

//Set hpp middleware to prevent http pollution
app.use(hpp())

//Cookie parser
app.use(cookieParser())

//File Upload middleware
app.use(fileUpload())

app.use(express.static(path.join(__dirname, 'public')))

connectDB()

//Mount using middleware
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} mode and on PORT: ${PORT}`))

