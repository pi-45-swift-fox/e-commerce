function errorHandler(err,req,res,next){
  let statusCode = 500
  let message = `internal server error`

  if(err.name === `SequelizeValidationError`){
    message = err.erros[0].message
    statusCode = 400
  }else if (err.message){
    message = err.message
    statusCode = err.statusCode
  }
  res.status(statusCode).json(message)
}

module.exports = errorHandler