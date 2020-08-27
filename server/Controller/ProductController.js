const {Product} = require('../models')

class UserController {

    static async show(req, res, next) {
        try{
            
            const data = await Product.findAll()
            if(!data){
                return next({errorCode : "INVALID_DATA"})

            } else {
                res.status(200).json(data)
            }
        }catch(err){
        
            next(err)
        
        }
    }

    static async add(req, res, next) {
        
        try{
            const {name, image_url, price, stock} = req.body
            const newData = await Product.create({name,image_url,price,stock})
            res.status(201).json({newData})
            
        } catch(err){
            next(err)
        }

    }

    static async update(req, res, next) {
        
        try{

            const {name, image_url, price, stock} = req.body
            const currentData = await Product.findByPk(req.params.id)
            if(!currentData){
                return next({errorCode : "INVALID_DATA"})
            }
            const update = await Product.update({name, image_url,price,stock}, {where:{id:currentData.id}, returning:true})
            res.status(200).json({data: update[1]})

        }catch(err){
            next(err)
        }
    }

    static async delete(req, res, next) {

        try{

            const data = await Product.destroy({where:{id:req.params.id}})
            if(!data){
                return next({errorCode : "INVALID_DATA"})
            }
            res.status(200).json({Message: "Data has been destroyed"})

        } catch(err){

            next(err)
        }

    }

}

module.exports = UserController