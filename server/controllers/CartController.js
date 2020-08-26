const {Cart, User, Product} = require('../models')

class CartController {
    static async add(req, res, next) {
        try {
            const {ProductId, quantity} = req.body

            const cart = await Cart.create({ProductId, quantity, UserId: req.userLogin.id})

            res.status(201).json({message: 'successfully added to cart'})
        } catch(err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        try {
            const carts = await Cart.findAll({
                where:  {UserdId: req.body.UserId},
                include: [{model: User}, {model: Product}]
            })
        } catch(err) {
            console.log(err)
        }
    }

    static async update(req, res, next) {
        try {
            const {status, quantity} = req.body

            const updated = await Cart.update(
                {status, quantity},
                {where: {id: req.params.id}}
                )

            if (updated[0] > 0) {
                res.status(201).json({message: 'successfully updated'})
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = CartController
