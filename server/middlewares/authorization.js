// const { User } = require('../models')

function authorization (req, res, next) {
    if(req.user.role == 'admin') {
        next()
    } else {
        next({name: 'Not Authorized'})
    }
}

function authorizationCust (req, res, next) {
    if(req.user.role == 'customer') {
        next()
    } else {
        next({name: 'Not Authorized cust'})
    }
}


module.exports = { authorization, authorizationCust }