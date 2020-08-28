const { Cart,Product } = require('../models')
class CartController {
  static async createCart(req, res) {
    const { ProductId,  quantitiy } = req.body
    const status = 'belum di beli'
    const UserId = req.userData.id
    console.log(quantitiy,'<<<<<<<')
    try {
      const createData = await Cart.create({ ProductId, UserId, quantitiy, status })
      res.status(201).json({ message: 'berhasil membuat cart' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'internal server error' })
    }
  }
  static async editCart(req, res) {
    const id = req.params.id
    const { status, quantity } = req.body
    try {
      const result = await Cart.update({ status, quantity }, { where: { id } })
      res.status(200).json({ message: 'berhasil update cart' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'internal server error' })
    }
  }
  static async showCart(req, res) {
    const UserId = req.userData.id
    try {
      const data = await Cart.findAll({include: Product,
        where: {
          UserId
        }
      })
      console.log(data)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'internal server error' })
    }
  }
  static async delCart(req, res) {
    const id = req.params.id
    try {
      const result = await Cart.destroy({ id })
      res.status(200).json({ message: 'berhasil delete cart' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'internal server error' })
    }
  }
}
module.exports = CartController