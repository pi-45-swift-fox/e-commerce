const {user,Cart} = require('../models')

function authentication (req,res,next){
    Cart.findOne({where:{productId:req.params.id,userId:req.userLogin.id}})
    .then(data=>{
        if(!data){
          res.status(400).json({message:'data is not found in your cart'})
        } else {
            console.log('found>>')
            next()
        }
    })
    .catch(err=>{
        console.log('>>>>>',err)
        res.status(500).json(err)
    })
}
module.exports = authentication