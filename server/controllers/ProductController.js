const {Product} = require ('../models')
class ProductController{
  static async addProduct(req,res,next){
    const {name,image_url,price,stock} = req.body
    try {
      const Productadd = await Product.create({name:name,image_url:image_url,price:price,stock:stock})
      res.status(201).json({message: 'success add data',id:Productadd.id})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
  static async showAll(req,res,next){
    // console.log('ke hit <<<<<<<')
    try {
      const productData =  await Product.findAll()
      res.status(200).json({product:productData,message:'success fetch data'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
  static async deleteProduct(req,res,next){
    const id = req.params.id
    try {
      const deleteData = await Product.destroy({where:{id:id}})
      res.status(200).json({message:'success delete data'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
  static async editProduct(req,res,next){
    const id = req.params.id
    const {name,image_url,price,stock} = req.body
    try {
      const editData = await Product.update({name:name,image_url:image_url,price:price,stock:stock},{where:{id:id}})
      res.status(200).json({message:'success update data'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
  static async bannerProduct(req,res){
    try {
      const bannerData = await Product.findAll({
        order:[
          ['sold','DESC']
        ],
        limit:3
      })
      res.status(200).json(bannerData)
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
}
module.exports = ProductController