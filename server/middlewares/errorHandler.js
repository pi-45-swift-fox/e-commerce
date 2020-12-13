function errorHandler (err, req, res, next) {

    switch (err.name) {
        case "SequelizeValidationError":
            const message = []
            err.errors.forEach(element => {
                message.push(element.message)
            });
            return res.status(400).json(message.join());

        case "ErrorValidation":
            return res.status(err.status).json({
                message: err.message
            })

        case "ProductNotFound":
            return res.status(err.status).json({
                message: err.message
            })

        case "invalidToken":
            return res.status(err.status).json({
                message: err.message
            })
    
        default: return res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = errorHandler