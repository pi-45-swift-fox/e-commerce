const { Product } = require('../models')

class ProductController {
    static read(req, res, next) {
        console.log('masuk read product');
        Product.findAll()
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.log(err, 'error disini')
                next(err)})
    }

    static create(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(newProduct)
            .then(data => res.status(201).json(data))
            .catch(err => next(err))
    }

    static update(req, res, next) {
        console.log('masuk update');
        
        let editProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(editProduct, {where: {id: req.params.id}})
            .then(data => {
                console.log('update success');
                
                res.status(200).json({msg: 'product update'})})
            .catch(err => {
                console.log('gagal update');
                
                next(err)})
    }

    static delete (req, res, next) {
        Product.destroy({where: {id: +req.params.id}})
            .then(data => res.status(200).json({msg: 'product delete'}))
            .catch(err => next(err))
    }
}

module.exports = ProductController