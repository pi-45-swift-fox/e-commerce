const { decode } = require('../helpers/jwt')
const { User, Product } = require('../models')

async function authentication (req, _, next) {
    let { access_token } = req.headers
    
    try {
        const decoded = decode(access_token)
        const { id } = decoded
        const user = await User.findByPk(id)
        
        if (user) {
            req.user = user
            next()
        } else {
            throw {status: 400, name: "ErrorValidation", message:"Authentication failed User"}
        }
    } catch (err) {
        next(err)
    }
}

async function authorization (req, res, next) {
    try {
        if (req.user.role === "admin") {
            next()
          } else { throw { statusCode: 403, name: "CustomValidation", message: 'Forbidden Access'} }
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, authorization }