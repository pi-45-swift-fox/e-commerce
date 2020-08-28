require('dotenv').config()
const jwt = require('jsonwebtoken')


function authentication(req,res,next){
    try{
        let token =  req.headers.access_token
        // console.log('ini di middleware>>>>>',req.headers)
    if(!token){
        res.status(400).json({message:'token not found'})
    }
    else{
        //console.log('token>>>>',token)
        const userLogin=jwt.verify(token,'secret')
        if(userLogin){
            // console.log('ini userLogin>>>>>',userLogin)
            req.userLogin=jwt.decode(token)
            next()
        }else{
            // console.log('masuk else>>>>>')
            res.status(500).json({message:'not authenticated'})
        }
    }
    }catch(err){
        console.log('catch err>>>>>',err)
        res.status(500).json({message:err.message})
    }
    

}
module.exports=authentication