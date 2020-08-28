function errorHandler(err, req, res, next) {
    let errCode = 'INVALID_SERVER'
    let message = 'Invalid Server'
    let status = 500
    if(err.name === 'SequelizeValidationError'){
        status = 403
        errCode = err.name
        message = err.message
    } else if(err.name === 'Invalid Request'){
        status = 400
        message = err. message
    } else if(err.name === 'Error Not Found'){
        status = 404
        errCode = err.name
        message = err.message
    }
    console.log({errCode, message});
    res.status(status).json({errCode, message})
}
module.exports = errorHandler