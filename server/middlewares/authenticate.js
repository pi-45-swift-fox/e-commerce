const jwt = require('jsonwebtoken')
const {User} = require('../models')

function authenticate(req,res,next){
    if(req.headers.access_token){
        const userLogin = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        if(userLogin){
           User.findOne({
               where:{
                   email:userLogin.email
               }
           })
           .then(data=>{
                req.userLogin = {
                    id:data.id,
                    role:data.role,
                    email:data.email
                }
               next()
           })
           .catch(err=>{
                next(err)
           })
        }

    } else{
        next({errCode:'INVALID_ACCOUNT', msg:['Please login first']})
    }
}

module.exports = authenticate