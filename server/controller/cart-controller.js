const {Cart,product,user} = require('../models')

class Controller {
    static async add (req,res) {
        try{
          const findProduct = await product.findOne({where:{id:req.params.id}})
          console.log('ini ni>>>>>>',findProduct.stock,req.body.quantity)
          if(!findProduct) {
              res.status(400).json({message: 'product is not found'})
          } else {
            if (req.body.quantity > findProduct.stock ) {
                return res.status(400).json({message:'quantity harus lebih kecil dari stock'})
              } else {
                  console.log('ini>>>>',findProduct.stock)
                  const savedProduct = await Cart.create({
                      quantity: req.body.quantity,
                      status: 'pending',
                      userId: req.userLogin.id,
                      productId:req.params.id
                  })
                  const result =  await product.decrement({
                    stock: Number(req.body.quantity)
                }, {where : {id: req.params.id}})
                return res.status(200).json({message:'success to add product to cart'})
              } 
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
            const getCart = await Cart.findAll({include:[user,product],where:{userId:req.userLogin.id,productId:req.params.id}})
            console.log('inigetcart>>>',getCart[0].dataValues.quantity)
            const findProduct = await product.findOne({where:{id:req.params.id}})
            const updateProduct = await product.increment({
                stock: Number(Number(getCart[0].dataValues.quantity))
            }, {where : {id: req.params.id}})
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
            const findProduct = await product.findOne({where:{id:req.params.id}})

            const result =  await product.decrement({
                stock: Number(req.body.addedQuantity)
            }, {where : {id: req.params.id}})
            res.status(200).json({message:'success to update data'})
        }catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = Controller