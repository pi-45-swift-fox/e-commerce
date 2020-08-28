function errorHandler(err, req, res, next){
    console.log(err)
    let statusCode = 500
    let message = ['Internal Server Error']
    let array = []
    
    if(err.errorCode == 'INVALID_USER' || err.name == 'JsonWebTokenError' || err.errorCode == 'INVALID_TOKEN'){
        message = ['Incorrect Username or Password']
        array.push(message)
        statusCode = 401
    }
    if (err.name == 'SequelizeUniqueConstraintError') {
        statusCode = 400
        const errors = []
        err.errors.forEach(el => {
            errors.push(el.message)
        });

        message = errors
        array.push(message)
    }
    if (err.name == 'SequelizeValidationError') {
        statusCode = 400
        const errors = []
        err.errors.forEach(el => {
            errors.push(el.message)
        });

        message = errors
        array.push(message)
    }
    if (err.errorCode == "INVALID_DATA"){
        statusCode = 404
        message = ['Data not Found']
        array.push(message)
    }
    
    if (err.name == 'SequelizeUniqueConstraintError') {
        statusCode = 400
        message = ['Email already registered']
        array.push(message)
    }
    
    if (err.errorCode == "INVALID_AUTHORIZATION"){
        message = ['Not authorize']
        statusCode = 401
        array.push(message)

    }
    if (err.errCode == "OUT_OF_STOCK"){
        statusCode = 400
        message = ["OUT OF STOCK"]
        array.push(message)
    }
    return res.status(statusCode).json({message})
}

module.exports = errorHandler