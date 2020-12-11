const ErrorResponse = require('../utils/errorResponse')

const errorHandler  = (err, req, res, next) => {
  let error = {...err}
  error.message = err.message
  
  //Console.log for development
  // console.log(err.stack)
  console.log(err)  

  //Mongoose bad ObjectId 
  if(err.name === 'CastError') {
    let message = `Resource not found with an id ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  if(err.code === 11000) {
    let message = `Duplicate keys or key has been inserted`
    error = new ErrorResponse(message, 404)
  }

  if(err.name === 'ValidationError') {
    let message = Object.values(error.errors).map(val => val.message)
    error = new ErrorResponse(message, 404)
  }


  res
    .status(error.statusCode || 500)
    .json({success: false, error: error.message || 'Server Error'})
}


module.exports = errorHandler