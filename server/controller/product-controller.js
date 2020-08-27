const {product}=require('../models')

class Controller {
    static create(req,res){
        let obj={
            name:req.body.name,
            price:Number(req.body.price),
            image_url:req.body.image_url,
            stock:Number(req.body.stock)
        }
        product.create(obj)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            if(err.name==="SequelizeValidationError"){
                return res.status(400).json({message:err.errors[0].message})
            }else if(err.name==="SequelizeDatabaseError"){
                return res.status(400).json({message:'invalid input syntax for type integer'})
            }
        
            res.status(500).json(err)
        })
    }
    static read(req,res){
        product.findAll()
        .then(data=>{
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json({message:'data not found'})
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static delete(req,res){
        product.findOne({where:{id:req.params.id}})
        .then(data=>{
            if(data){
                return product.destroy({where:{id:req.params.id}})
                
                
            }
            else{
                res.status(400).json({message:'item not found'})
            }
        })
        .then(data1=>{
            res.status(200).json({message:data1})
        })
        .catch(err=>{
            
            res.status(500).json({message:'delete error'})
        })
    }
    static async update (req,res) {
        try{
            const data = await product.findOne({where:{id:req.params.id}})
            if(data){
                let obj = {
                    name: req.body.name,
                    image_url: req.body.image_url,
                    price: req.body.price,
                    stock: req.body.stock
                }
                const updatedProduct = await product.update(obj,{where:{id: req.params.id}})
                res.status(200).json({message:`
                Success to update product with id: ${req.params.id}
                `})

                
            } else {
                res.status(400).json({message:'data not found'})
            }
        }catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

}
module.exports=Controller