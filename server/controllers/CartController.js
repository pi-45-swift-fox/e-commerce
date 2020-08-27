const { Cart, User, Product } = require('../models');
class CartController {
    static async getCart(req,res,next) {
        try{
            const carts = await Cart.findAll({
                where: {
                    UserId: req.userLogin.id
                },
                include: [{
                    model: Product,
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'password', 'updatedAt']
                    }
                }]
            })
            if(carts) {
                res.status(200).json({ carts })
            }

        }
        catch (err) {
            next(err)
        }
    }

    static async addToCart(req,res,next){
        try{
            const ProductId = req.params.id
            const UserId = req.userLogin.id
            const checkCart = await Cart.findOne({
                where: {
                    ProductId,
                    UserId
                },
                include: [Product]
            })
            if (!checkCart) {
                const added = await Cart.create({
                    UserId,
                    ProductId,
                    status: false,
                    quantity: 1
                })
                res.status(201).json({ added })
            }
            else {
                const idCart = checkCart.id
                const quantity = +checkCart.quantity + 1
                if(quantity > checkCart.Product.stock){
                    return next({ errCode: 'FORBIDDEN', msg: `Maximum stock is ${checkCart.Product.stock}`})
                }
                const updateStock = await Cart.update({ quantity }, {
                    where:{
                        id: idCart
                    }
                })
                res.status(200).json({updateStock})
            }

        }
        catch(err){
            next(err)
        }
    }

    static async updateCart (req,res,next) {
        try {
            const cartId = req.params.id
            console.log(cartId);
            const { quantity, status } = req.body
            console.log(quantity, status, 'SINIIIIIIIIIIIIIIIIII');
            const update = await Cart.update({
                quantity,
                status
            }, {
                where: {
                id:cartId
                }
            })
            console.log(update);
            if(update) {
                res.status(200).json({ message: 'Successfully updated' })
            }
        }
        catch(err) {
            next(err)
        }
    }

    static async updateCartAndProduct (req,res,next) {
        try {
            const findCart = await Cart.findAll({
                where: {
                    UserId: req.userLogin.id,
                    status: false
                },
                attributes: [
                    'id', 'UserId', 'ProductId', 'status', 'quantity'
                ],
                include: [Product]
            })
            let errorBuy = []
            let prodName = []
            let carts = []
            findCart.forEach(el => {
                if(el.Product.stock <= el.quantity) {
                    errorBuy.push(el.id)
                    prodName.push(el.Product.name)
                } else {
                    carts.push(el)
                }
            });

            console.log('siniiii', errorBuy);
            let msg = []
            if(errorBuy.length >= 1) {
                prodName.forEach(el => {
                    msg = msg.push(`Stock is not available for product ${el}`)
                });
                return next({ errCode: 'validation', msg })
            }

            console.log('masokga');


            await carts.forEach(async el => {
                stock = +el.Product.stock
                await Product.update({
                    stock: ( stock -= el.quantity)
                    },
                    {   where: {
                        id: el.Product.id
                    }
                })

                await Cart.update({
                    status: true
                },
                {
                    where: {
                        id: el.id
                    }
                })
            });

            res.status(200).json({ message: 'Successfully Updated' })
            // const cartId = req.params.id
            // const UserId = req.userLogin.id
            // const { status } = req.body
            // const updateCart = await Cart.update({
            //     status
            // }, {
            //     where: {
            //         UserId,
            //         status: false
            //     },
            //     returning: true
            // })
            // console.log('sinijnsadknf', updateCart);


            // let ProductId = []
            // let quantity = []
            // updateCart[1].forEach(el => {
            //     ProductId.push(el.ProductId)
            //     quantity.push(el.quantity)
            // });
            // res.status(200).json({ updateCart })
            // console.log(ProductId, quantity);
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = CartController