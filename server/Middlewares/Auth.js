const {User} = require('../models')
const {JWT} = require('../helpers')

class Authenticate{

    static async Authenticate(req, res, next){
        try{
            if(!req.headers.access_token){
                return next({errorCode : 'INVALID_TOKEN'})
            }
            const check = JWT.verifyToken(req.headers.access_token)
            if(check){
                req.userLogin = {id:check.id, email:check.email, role:check.role}
                next()
            }

        }catch(err){
            next({errorCode : "INVALID_USER"})
        }
    }
}

class Authorize{
    static AuthorizeAdmin(req, res,next){
        if(req.userLogin.role == 'admin'){
            next()
        }else{
            next({errCode: "INVALID_AUTHORIZATION"})
        }
    }
    static AuthorizeUser(req, res,next){
        if(req.userLogin.role == 'user'){
            next()
        }else{
            next({errCode: "INVALID_AUTHORIZATION"})
        }
    }
}

module.exports = {Authenticate, Authorize}