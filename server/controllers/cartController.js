const { Cart, Product } = require('../models')

class cartController {
    static async create(req, res, next) {
        try {
            const UserId = req.userLogin.id
            const { ProductId, quantity } = req.body
            const newCart = await Cart.create({
                UserId,
                ProductId,
                quantity
            })
            res.status(201).json(newCart)
        } catch (error) {
            next(error)
        }
    }

    static async read(req, res, next) {
        try {
            const UserId = req.userLogin.id
            const readAll = await Cart.findAll({
                where: {
                    UserId
                },
                include: [{
                    model: Product,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }],
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(readAll)
        } catch (error) {
            next(error)
        }
    }

    static async readOne(req, res, next) {
        try {
            const id = +req.params.id
            const one = await Cart.findOne({
                where: {
                    id
                }
            })
            res.status(200).json(one)
        } catch (error) {
            
        }
    }

    static async update (req, res, next) {
        try {
            const id = +req.params.id
            const { quantity, status } = req.body
            const newUpdate = await Cart.update({
                quantity,
                status
            },{
                where:{
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
            const willDelete = await Cart.destroy({
                where: {
                    id
                }
            })
            res.status(200).json('Berhasil delete')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = cartController