const { User, Cart } = require('../models')
const jwt = require('jsonwebtoken')

class auth {
    static async authentication(req, res, next) {
        try {
            if (!req.headers.access_token) {
                res.status(401).json({message: 'Not Authorized'})
            }
            const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
            User.findOne({
                where: {
                    email: payload.email
                }
            })
            .then((result) => {
                let user = result
                if (!user) {
                    res.status(401).json({message: 'Not Authorized'})
                } else {
                    req.userLogin = user
                    next()
                }
            })
        } catch (error) {
            res.status(401).json({message: 'Not Authorized'})
        }
    
    }

    static async authorization(req, res, next) {
        if (req.userLogin.role !== 'admin') {
            res.status(403).json('Not Authorized Access')
        } else {
            next();
        }
    }
}

module.exports = auth
