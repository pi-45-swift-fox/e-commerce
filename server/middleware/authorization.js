
function authorization(req,res,next){
    if(req.userLogin.role==='admin'){
        next()        
    }
    else{
        res.status(400).json({message:'not authorized'})
        
    }
}
module.exports=authorization