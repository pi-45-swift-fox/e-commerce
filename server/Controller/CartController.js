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
                console.log(addProduct)
                res.status(201).json(addProduct)
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
                res.status(200).json(updateProduct[1])
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