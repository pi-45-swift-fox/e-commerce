const {Cart, User, Product} = require('../models')

class CartController {
    static async add(req, res, next) {
        try {
            const {ProductId} = req.body

            const cart = await Cart.create({ProductId, quantity: 1, UserId: req.userLogin.id})

            res.status(201).json({message: 'successfully added to cart'})
        } catch(err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        try {
            const carts = await Cart.findAll({
                where: {UserId: req.userLogin.id},
                include: [User, Product],
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(carts)
        } catch(err) {
            next(err)
        }
    }
    
    // fungsi update tidak jadi dipakai 
    // static async update(req, res, next) {
    //     try {
    //         const {status, quantity} = req.body

    //         const updated = await Cart.update(
    //             {status, quantity},
    //             {where: {id: req.params.id}}
    //             )

    //         if (updated[0] > 0) {
    //             res.status(201).json({message: 'successfully updated'})
    //         } else {
    //             next({errorCoce: 'NOT_FOUND'})
    //         }
    //     } catch(err) {
    //         next(err)
    //     }
    // }

    static async qtyIncrement(req, res, next) {
        try {
            const {ProductId} = req.body
            const cart = await Cart.increment('quantity', {
                where: {id: req.params.id, ProductId, UserId: req.userLogin.id}
            })
            
            if (cart) {
                res.status(201).json({message: 'successfully updated'})
            } else {
                next({errorCoce: 'NOT_FOUND'})
            }
        } catch(err) {
            next(err)
        }
    }

    static async qtyDecrement(req, res, next) {
        try {
            const {ProductId} = req.body
            const cart = await Cart.decrement('quantity', {
                where: {id: req.params.id, ProductId, UserId: req.userLogin.id}
            })
            
            if (cart) {
                res.status(201).json({message: 'successfully updated'})
            } else {
                next({errorCoce: 'NOT_FOUND'})
            }
        } catch(err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const deleted = await Cart.destroy({
                where: {id: req.params.id, ProductId: req.params.ProductId, UserId: req.userLogin.id}
            })

            if (deleted > 0) {
                res.status(200).json({message: 'deleted succesfully'})
            } else {
                next({errorCode: 'NOT_FOUND'})
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = CartController
