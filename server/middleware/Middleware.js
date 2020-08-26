const Helper = require('../helpers/Helper')
const {User} = require('../models')

class Middleware {
    static authentication(req, res, next) {
        if (req.headers.access_token) {
            try {
                const userData = Helper.verify(req.headers.access_token)

                User.findOne({
                    where: {
                        email: userData.email
                    }
                })
                    .then(user=>{
                        req.userLogin = {id: user.id, email: user.email}
                        next()
                    })
            } catch(err) {
                next(err)
            }
        } else {
            next({errorCode: 'FORBIDDEN'})
        }
    }

    static authorization(req, res, next) {
        try {
            User.findOne({
                where: {id: req.userLogin.id, email: req.userLogin.email}
            })
                .then(user=>{
                    if (user.role == 'admin') {
                        next()
                    } else {
                        next({errorCode: 'FORBIDDEN'})
                    }
                })
            
        } catch(err) {
            next(err)
        }
    }

    static errorHandler(err, req, res, next) {
        let errorCode = 'INTERNAL_SERVER_ERROR'
        let message = 'internal server error'
        let status = 500

        if (err.message == 'invalid email or password') {
            errorCode = 'NOT_FOUND'
            message = err.message
            status = 404
        } else if (err.name == 'SequelizeValidationError') {
            const errors = []

            err.errors.forEach(element => {
                errors.push(element.message)
            });

            errorCode = 'BAD_REQUEST'
            message = errors.join(', ')
            status = 400
        } else if (err.errorCode == 'FORBIDDEN') {
            errorCode = err.errorCode
            message = 'authentication or aithorization failed'
            status = 401
        } else if (err.errorCode == 'NOT_FOUND') {
            errorCode = err.errorCode
            message = 'data not found'
            status = 404
        }

        return res.status(status).json({message, errorCode})
    }
}

module.exports = Middleware
