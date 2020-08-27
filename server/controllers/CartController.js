const { Model } = require("sequelize/types");
const {Cart} = require('../models')
class CartController{
  static async createCart(req,res){
    const {ProductId,UserId,quantity,status} = req.body
    try {
      const createData = await Cart.create({ProductId,UserId,quantity,status})
      res.status(201).json({message:'berhasil membuat cart'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
  static async editCart(req,res){

    try {
      
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
  static async showCart(req,res){
    const UserId = req.body.UserId
    try {
      const data = await findAll({
        where:{
          UserId
        }
      })
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
}
module.export = CartController