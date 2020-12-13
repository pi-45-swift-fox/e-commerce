const {Cart, Product} = require(`../models`)
const e = require("express")

class CartController {

    static show (req, res, next) {
        let UserId = req.user.id
        const error = {
            name: `otherError`,
            statusCode: 404,
            message: `Sorry can't find data.`
        }

        Cart.findAll({where: {UserId}, include: [`Product`], order: [['createdAt', 'ASC']]})
        .then((result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                throw error
            }
        })
        .catch((err) => {
            console.log('iniidia>>', err);
            next(err)
        })
    }

    static add (req, res, next) {
        let newCart = {
            UserId: +req.user.id,
            ProductId: +req.params.ProductId,
            quantity: +req.body.quantity,
            status: false
        }
        Cart.findOne({where: {UserId: newCart.UserId, ProductId: newCart.ProductId}})
        .then((result) => {
            if(!result) {
                return Cart.create(newCart)
            } else {
                return Cart.increment({quantity: newCart.quantity}, {where: {id: result.id}})
            }
        })
        .then((result) => {
            if(Array.isArray(result)) {
                res.status(200).json(result[0][0][0])
            } else {
                res.status(201).json(result)
            }
        })
        .catch((err) => {
            console.log('addini>>', err);
            next(err)
        })
    }

    static destroy (req, res, next) {
        let id = req.params.id
        const error = {
            name: `otherError`,
            statusCode: 404,
            message: `Sorry can't find data.`
        }

        Cart.destroy({where: {id}})
        .then((result) => {
            if (result === 0) {
                throw error
            } else {
                res.status(200).json({message: `Successfully delete item from cart!`})
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static destroyAll (req, res, next) {
        let UserId = req.user.id
        const error = {
            name: `otherError`,
            statusCode: 404,
            message: `Sorry can't find data.`
        }

        Cart.destroy({where: {UserId}})
        .then((result) => {
            if (result === 0) {
                throw error
            } else {
                res.status(200).json({message: `Successfully delete items from cart!`})
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static update (req, res, next) {
        let id = req.body.ProductId
        let cartQuantity = req.body.quantity

        Product.decrement({stock: cartQuantity}, {where: {id}})
        .then((result) => {
            res.status(200).json(result[0][0][0])
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = CartController