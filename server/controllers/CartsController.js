const { Cart } = require('../models')
const { Product } = require('../models')
const { User } = require('../models')

class CartsController {
    static add(req, res, next) {
        console.log('test controller');
        const payload = {
            UserId: req.UserId,
            ProductId: req.body.ProductId,
            quantity: req.body.quantity,
            checkout: false
        }
        Cart.findOne({ where: { ProductId: payload.ProductId, UserId: payload.UserId } })
            .then((data) => {
                if (data) {
                    console.log('ketemu');
                    let newdata = {
                        quantity: +data.quantity + (+payload.quantity)
                    }
                    Cart.update(newdata, {
                            where: {
                                id: data.id
                            }
                        })
                        .then((result) => {
                            return res.status(201).json(result)
                        })
                } else {
                    console.log('gak ketemu');
                    Cart.create(payload)
                        .then((data) => {
                            return res.status(201).json({
                                id: data.id,
                                UserId: data.UserId,
                                ProductId: data.ProductId,
                                quantity: data.quantity,
                                checkout: data.checkout
                            })
                        })
                }
            })
            .catch((err) => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ msg: 'Failed to Add.' }]
                })
            })
    }

    static findAll(req, res, next) {
        Cart.findAll({
                where: { UserId: req.UserId },
                include: [{ model: Product }]
            })
            .then((data) => {
                return res.status(200).json(data)
            })
            .catch((err) => {
                console.log(err);
                return next({
                    name: 'InternalServerError',
                    errors: [{ msg: 'Failed to Show.' }]
                })
            })
    }

    static findOne(req, res, next) {
        Cart.findOne({
                where: {
                    id: req.params.id
                },
                include: [Product]
            })
            .then((data) => {
                if (data) {
                    return res.status(200).json(data)
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ msg: 'Data Not Found' }]
                    })

                }
            })
            .catch((err) => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ msg: 'Failed to Show.' }]
                })
            })
    }

    static delete(req, res, next) {
        Cart.destroy({ where: { id: req.params.id } })
            .then((result) => {
                return res.status(201).json({ message: `Cart deleted with UserId ${result}` })
            })
            .catch((err) => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ msg: 'Failed to Show.' }]
                })
            })
    }
}
module.exports = CartsController