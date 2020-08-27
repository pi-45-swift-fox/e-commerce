const {Product} = require('../models')

class ProductController {
    static async add(req, res, next) {
        try {
            const product = await Product.create({
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock
            })

            res.status(201).json(product)
        } catch(err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        try {
            const products = await Product.findAll({order: [['updatedAt', 'DESC']]})

            res.status(200).json(products)
        } catch(err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const product = await Product.update({
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock
            },
            {
                where: {id: req.params.id}
            },
            {
                returning: true
            })

            res.status(200).json(product[1])
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const deleted = await Product.destroy({
                where: {id: req.params.id}
            })

            if (deleted > 0) {
                res.status(200).json({message: 'resource deleted successfully'})
            } else {
                next({errCode: 'NOT_FOUND'})
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = ProductController
