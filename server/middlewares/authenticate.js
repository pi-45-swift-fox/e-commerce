const jwt = require('jsonwebtoken')
const { User } = require('../models')

function authenticate (req, res, next) {
    console.log('masuk authenticate')
    if(!req.headers.accesstoken) {
        return next({name: 'Not Authorized'})
    } 
    try {
        const userToken = jwt.verify(req.headers.accesstoken, process.env.SECRET)
        User.findOne({where: {id: userToken.id}})
            .then(user => {
                if (!user) {
                    next({name: 'Not Authorized'})
                } else {
                    console.log('data user send')
                    req.user = user.dataValues
                    console.log(req.user)
                    next()
                }
            })
    } catch (err) {
        console.log('error authen')
        next(err)
    }
}

module.exports = authenticate