const { Product } = require('../models')

class ProductController {
    static add (req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            BannerId: req.body.BannerId
        }
        
        Product.create(newProduct)
        .then((product) => {
            return res.status(201).json(product)
        })
        .catch((err) => {
            next(err)
        })
    }

    static show (req, res, next) {
        Product.findAll({order: [['createdAt', 'ASC']], include: 'Banner'})
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static showById (req, res, next) {
        const id = req.params.id

        Product.findByPk(id)
        .then((product) => {
            if (!product) {
                throw {status: 404, name: "ErrorValidation", message:"Product not Found"}
            } else {
                return res.status(200).json(product)
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static update (req, res, next) {
        const id = req.params.id
        const updateProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            BannerId: req.body.BannerId
        }

        Product.findByPk(id)
        .then((product) => {
            if (product) {
                return product.update(updateProduct)
            } else {
                throw { status: 404, message: 'Product not found', name: "ProductNotFound" }
            }
        })
        .then((product) => {
            return res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static destroy (req, res, next) {
        const id = req.params.id;
        let deleted;

        Product.findByPk(id)
        .then((product) => {
            deleted = product
            if (!product) {
                throw {status: 404, name: "ErrorValidation", message:"Product not Found"}
            } else {
                return product.destroy()
            }
        })
        .then((product) => {
            res.status(200).json(deleted)
        }).catch((err) => {
            next(err)
        });
        
    }
}

module.exports = ProductController