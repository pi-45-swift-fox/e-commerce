const { Product } = require('../models')

class ProductController {

    static async addProduct(req,res,next) {
        try {
            const { name,image_url,price,stock } = req.body
            const newProd = {
                name,
                image_url,
                price,
                stock,
                UserId: req.userLogin.id
            }
            const created = await Product.create(newProd)
            if(created) {
                res.status(201).json({
                    id: created.id,
                    name: created.name,
                    price: created.price,
                    stock: created.stock,
                })
            }
        } catch(err) {
            next(err)
        }
    }

    static async getSelectedProduct(req,res,next) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                }
            })
            if(product) {
                res.status(200).json({product})
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateProduct(req,res,next) {
        try{
            const id = req.params.id
            const { name,image_url,price,stock } = req.body
            const reqUpdateProduct = {
                name,
                image_url,
                price,
                stock
            }
            const updated = await Product.update(reqUpdateProduct, {
                where: {
                    id
                }
            })
            if(updated) {
                res.status(200).json({message:['Successfully update']})
            } else {
                next({ errCode: 'NOT_FOUND' })
            }
        } catch(err) {
            next(err)
        }
    }

    static async getAllProducts(req,res,next){
        try{
            const prodList = await Product.findAll()
            if(prodList) {
                let products = []
                prodList.forEach(el => {
                    if(el.stock > 0) {
                        products.push(el)
                    }
                });
                res.status(200).json({products})
            }
        } catch(err) {
            next(err)
        }
    }

    static async deleteProduct(req,res,next) {
        try {
            const id = req.params.id
            const deleteProduct = await Product.destroy({
                where: {
                    id
                }
            })
            if(deleteProduct){
                res.status(200).json({message : ['Successfully deleted']})
            } else {
                next({ errCode: 'NOT_FOUND' })
            }
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ProductController