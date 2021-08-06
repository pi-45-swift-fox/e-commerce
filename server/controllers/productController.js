const { User, Product } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Controller {
    static async create(req, res, next){
        console.log('masuk', req.body);
        try {
            const { name, image_url, price, stock, category} = req.body
            const newProduct = await Product.create({
                name,
                image_url,
                price: +price,
                stock: +stock,
                category
            })
            res.status(201).json(`product with name ${newProduct.name} created`)
        } catch (error) {
            next(error)
        }
    }

    static async read(req, res, next){
        try {
            const products = await Product.findAll({
                order: [['name', 'ASC']]
            })
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async readOne(req, res, next){
        console.log('masuk');
        try {
            const id = req.params.id
            const one = await Product.findOne({
                where: {
                    id
                }
            })
            res.status(200).json(one)
            console.log(one);
        } catch (error) {
            next(error)
        }
    }    
    static async update(req, res, next){
        try {
            console.log('masuk controller');
            const { name, image_url, price, stock, category} = req.body
            const id = +req.params.id
            const willUpdate = await Product.update({
                name,
                image_url,
                price,
                stock,
                category
            }, {
                where: {
                    id
                }
            })  
            res.status(200).json('berhasil update')
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next){
        try {
            const id = +req.params.id
            const willDelete = Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json('berhasil delete')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller