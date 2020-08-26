function errorHandler(err, req, res, next){
    let statusCode = 500
    let Message = ['Internal Server Error']
    console.log(err)
    let array = []
    
    if(err.errorCode == 'INVALID_USER' || err.name == 'JsonWebTokenError' || err.errorCode == 'INVALID_TOKEN'){
        Message = ['Incorrect Username or Password']
        array.push(Message)
        statusCode = 401
    }
    
    if (err.name == 'SequelizeValidationError') {
        statusCode = 400
        const errors = []
        err.errors.forEach(el => {
            errors.push(el.message)
        });

        Message = errors
        array.push(Message)
    }
    if (err.errorCode == "INVALID_DATA"){
        statusCode = 404
        Message = ['Data not Found']
        array.push(Message)
    }
    
    if (err.name == 'SequelizeUniqueConstraintError') {
        statusCode = 400
        Message = ['Email already registered']
        array.push(Message)
    }
    
    if (err.errorCode == "INVALID_AUTHORIZATION"){
        Message = ['Not authorize']
        statusCode = 401
        array.push(Message)

    }
    
    // console.log(err)
    return res.status(statusCode).json({Message})
    return res.status(statusCode).json(err)

}

module.exports = errorHandler