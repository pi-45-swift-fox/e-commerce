const {Cart,product,user} = require('../models')

class Controller {
    static async add (req,res) {
        try{
          const findProduct = await product.findOne({where:{id:req.params.id}})
          if(!findProduct) {
              res.status(400).json({message: 'product is not found'})
          } else {
              console.log(req.userLogin)
              const savedProduct = await Cart.create({
                  quantity: req.body.quantity,
                  status: 'pending',
                  userId: req.userLogin.id,
                  productId:req.params.id
              })
              res.status(200).json({message:'success to add product to cart'})
          }
        } catch(err) {
            res.status(500).json(err)
        }
    }
    static async read (req,res) {
        try{
            console.log('masuk controller>>>>')
            const getCart = await Cart.findAll({include:[user,product],where:{userId:req.userLogin.id}})
            res.status(200).json(getCart)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async del (req,res) {
        try{
            console.log('masuk>>>')
            const delData = await Cart.destroy({where:{userId:req.userLogin.id,productId:req.params.id}})
            console.log('>>>>>>>',delData)
            res.status(200).json({message:'success to delete product from cart'})
        } catch(err) {
            res.status(500).json(err)
        }  
    }
    static async update(req,res){
        try{
            let obj = {
                quantity: req.body.quantity,
                status:req.body.status
            }
            const updatedData = await Cart.update(obj,{where:{userId:req.userLogin.id,productId:req.params.id}})
            res.status(200).json({message:'success to update data'})
        }catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = Controller