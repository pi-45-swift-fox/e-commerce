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
            const addProduct = await Cart.create({UserId:req.userLogin.id, ProductId:req.body.productId, status:'Wishlist', quantity:1})
            if(addProduct){
                res.status(201).json(addProduct)
            }
        }catch(err){
            next(err)
        }
    }
    static async update(req, res, next){
        try{
            const updateProduct = await Cart.update({where:{id:req.params.id}, returning:true})
            if(updateProduct){
                res.status(200).json(updateProduct[1])
            }
        }catch(err){
            next(err)
        }
    }
    static async delete(req, res, next){
        try{
            const deleteProduct = await Cart.destroy({where:{id:req.params.id}})
            res.status(200).json({Message: 'Success delete data'})
        }catch(err){
            next(err)
        }
    }
}

module.exports = Controller