const {Cart, User, Product} = require('../models')

class Controller{

    static async show(req, res, next){
        try{
            const data = await Cart.findAll({where: {UserId:req.userLogin.id}, include:[User,Product]})
            if(data){
                res.status(200).json(data)
            }
        }catch(err){
            next(err)
        }
    }
    static async add(req, res, next){
        try{
            console.log(req.body)
            const checkStock = await Product.findByPk(req.body.ProductId)
            const cart = await Cart.findOne({where:{ProductId:req.body.ProductId, UserId:req.userLogin.id}})
            if(cart){
                if(checkStock.stock > cart.quantity){   
                    const updateProduct = await Cart.update({quantity:cart.quantity+1},{where:{ProductId:req.body.ProductId}, returning:true})
                    if(updateProduct){
                        res.status(200).json(updateProduct)
                    }
                }else{
                    next({errCode:"OUT_OF_STOCK"})
                }
            } else  {
                const addProduct = await Cart.create({
                    UserId:req.userLogin.id,
                    ProductId:req.body.ProductId,
                    status:'Wishlist',
                    quantity:1
                },
                {
                    include:[Product],
                })
                if(addProduct){
                    res.status(200).json(addProduct)
                    console.log(addProduct)
                }
            }
        }catch(err){
            next(err)
        }
    }
    static async update(req, res, next){
        try{
            const {quantity} = req.body
            const updateProduct = await Cart.update({quantity},{where:{id:req.params.id}, returning:true})
            if(updateProduct){
                res.status(200).json({message: "Succesfully update cart"})
            }
        }catch(err){
            next(err)
        }
    }
    static async delete(req, res, next){
        try{
            const deleteProduct = await Cart.destroy({where:{id:req.params.id}})
            if(deleteProduct){
                res.status(200).json({Message: 'Success delete data'})
            }
        }catch(err){
            next(err)
        }
    }
}

module.exports = Controller