const { Product } = require('../models');

module.exports = class ProductController {
    static async getProducts(req, res, next) {
        try {
            const products = await Product.findAll();

            res.status(200).json(products);
        } catch (error) {
            next({
                code: 500,
                type: 'product',
                body: error
            });
        }
    }

    static async detailProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (product) {
                res.status(200).json(product);
            } else {
                next({
                    code: 404,
                    type: 'product',
                })
            }
        } catch (error) {
            next({
                code: 500,
                type: 'product',
                body: error
            })
        }
    }

    static async addProduct(req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        };
        
        try {
            const result = await Product.create(product);
            res.status(201).json({
                result
            });

        } catch (error) {
            next({
                code: 400,
                type: 'product',
                body: error
            });
        }
    }

    static async delProduct(req, res, next) {
        try {
            await Product.destroy({
                where: {
                    id: +req.params.id
                }
            });

            res.status(200).json({
                msg: 'Product Deleted'
            });
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static async updateProduct(req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        };

        try {
            const oldData = await Product.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (oldData) {
                const result = await Product.update(product, {
                    where: {
                        id: oldData.id
                    }
                });

                res.status(201).json({
                    msg: 'Product Updated',
                    result
                });
            } else {
                next({
                    code: 404,
                    type: 'product'
                });
            }
        } catch (error) {
            next({
                code: 400,
                type: 'product',
                body: error
            });
        }
    }
};