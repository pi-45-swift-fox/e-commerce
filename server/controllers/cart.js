const { Cart, Product } = require('../models');

module.exports = class CartController {
    static async list(req, res, next) {
        try {
            const cart = await Cart.findAll({
                where: {
                    UserId: req.userLogin.id,
                    status: 'in-cart'
                },
                attributes: [
                    'id', 'UserId', 'ProductId', 'status', 'quantity'
                ],
                include: [Product]
            });

            res.status(200).json(cart);
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static async list_history(req, res, next) {
        try {
            const cart = await Cart.findAll({
                where: {
                    UserId: req.userLogin.id,
                    status: 'complete'
                },
                attributes: [
                    'id', 'UserId', 'ProductId', 'status', 'quantity', 'updatedAt'
                ],
                include: [Product]
            });

            res.status(200).json(cart);
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static async add(req, res, next) {
        const input = {
            UserId: req.userLogin.id,
            ProductId: req.params.productId,
            quantity: req.body.quantity,
            status: 'in-cart'
        };

        try {
            const product = await Product.findOne({
                where: {
                    id: input.ProductId
                }
            });

            if (product) {
                const response = await Cart.findOne({
                    where: {
                        UserId: input.UserId,
                        ProductId: input.ProductId,
                        status: 'in-cart'
                    },
                    attributes: [
                        'id', 'quantity'
                    ]
                });

                if (response) {
                    const cart = response.dataValues;

                    if (product.stock >= cart.quantity) {
                        if (!(product.stock === cart.quantity)) {
                            cart.quantity++;

                            await Cart.update(cart, {
                                where: {
                                    id: cart.id
                                }
                            });

                            res.status(201).json({ msg: 'OK' });
                        } else {
                            next({
                                code: 400,
                                type: 'cart'
                            });
                        }
                    } else {
                        next({
                            code: 400,
                            type: 'cart'
                        });
                    }
                } else {
                    if (product.stock >= input.quantity) {
                        await Cart.create(input);

                        res.status(201).json({ msg: 'OK' });
                    } else {
                        next({
                            code: 400,
                            type: 'cart'
                        });
                    }
                }
            } else {
                next({
                    code: 404,
                    type: 'product'
                });
            }
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    // req.params.id = cart.id ({({ 404 handled in authorization })})

    static async update(req, res, next) {
        const input = {
            quantity: req.body.quantity
        };

        try {
            const cart = await Cart.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['ProductId']
            });

            const product = await Product.findOne({
                where: {
                    id: cart.ProductId
                }
            });

            if (product.stock >= input.quantity) {
                await Cart.update(input, {
                    where: {
                        id: req.params.id
                    }
                });

                res.status(201).json({ msg: 'OK' });
            } else {
                next({
                    code: 400,
                    type: 'cart'
                });
            }
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static async del(req, res, next) {
        try {
            await Cart.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({ msg: 'OK' });
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static async buy(req, res, next) {
        try {
            const cart = await Cart.findAll({
                where: {
                    UserId: req.userLogin.id,
                    status: 'in-cart'
                },
                attributes: [
                    'id', 'UserId', 'ProductId', 'status', 'quantity'
                ],
                include: [Product]
            });

            cart.forEach(element => {
                if (element.Product.stock <= element.quantity) {
                    throw { this: true, code: 400, type: 'cart' };
                }
            });

            console.log('jalan')
            cart.forEach(async element => {
                const product = element.Product;


                await Product.update({ stock: (product.stock -= element.quantity) }, {
                    where: {
                        id: product.id
                    }
                });

                await Cart.update({ status: 'complete' }, {
                    where: {
                        id: element.id
                    }
                });
            });

            res.status(200).json({ msg: 'OK' });
        } catch (error) {
            if (error.this) {
                next({
                    code: error.code,
                    type: error.type
                });
            } else {
                next({
                    code: 500,
                    body: error
                });
            }
        }
    }
}