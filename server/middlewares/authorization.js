function authorization(req,res,next){
    if(req.userLogin.role === 'admin') {
        next()
    } else {
        next({errCode:'FORBIDDEN'})
    }
}

module.exports = authorization