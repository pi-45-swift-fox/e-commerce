const { User, Cart, Product } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static login(req, res, next) {
        console.log('masuk login');

        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                console.log('cek email ada');

                if (!user) {
                    console.log('email tidak ada');

                    return next({ name: 'email or password is incorrect' })
                    // return res.status(400).json({msg: 'email or password is incorrect'})
                } else {
                    console.log('email ada');

                    const verified = compare(req.body.password, user.password)
                    if (verified) {
                        console.log('password betul');

                        const token = jwt.sign({ id: user.id }, process.env.SECRET)
                        res.status(200).json({ token, id: user.id })
                    } else {
                        console.log('password salah');

                        next({ name: 'email or password is incorrect' })
                        // res.status(400).json({msg: 'email or password is incorrect'})
                    }
                }
            })
            .catch(err => {
                console.log(err, 'masuk error');

                next(err)
            })
    }

    static registerCust(req, res) {
        console.log('masuk register')
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            role: 'customer'
        }
        User.create(newUser)
            .then(user => {
                console.log('sukses register')
                const token = jwt.sign({ id: user.id }, process.env.SECRET)
                res.status(201).json({ token, id: user.id })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        console.log('masuk create cart')
        const newProduct = {
            ProductId: req.body.ProductId,
            UserId: req.params.UserId,
            quantity: req.body.quantity,
            status: false
        }
        Cart.findAll({
            where: {
                UserId: req.params.UserId,
                ProductId: req.body.ProductId
            },
            include: [Product]
        })
            .then(result => {
                if (result.length !== 0) {
                    result[0].dataValues.quantity += +req.body.quantity
                    // res.send(result)
                    return Cart.update(result[0].dataValues, {
                        where: {
                            UserId: req.params.UserId,
                            ProductId: req.body.ProductId
                        }
                    })
                } else {
                    return Cart.create(newProduct)
                }
            })
            .then(data => {
                console.log('sukses tambah cart')
                res.status(201).json(data);
            }).catch(err => {
                console.log(err);
                res.send(500).json(err);
            });
    }

    static showCart(req, res) {
        Cart.findAll({
            where: { UserId: req.params.UserId },
            include: [Product]
        })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }

    static update(req, res) {
        const updateCart = {
            ProductId: req.params.ProductId,
            UserId: req.params.UserId,
            quantity: req.body.quantity
        }
        Cart.findAll({
          where: { 
              UserId: req.params.UserId,
              ProductId: req.params.ProductId
            }
        })
          .then((result) => {
            console.log('masuk then');
            if (!result) {
              console.log('customer not found');
              res.status(400).json({msg: 'Not Found'})
            } else {
              console.log('update control');
              return Cart.update(updateCart, {
                where: { 
                    UserId: req.params.UserId,
                    ProductId: req.params.ProductId
                }
              })
            }
          })
          .then(() => {
            console.log('then update controler');
            res.status(200).json({message: 'Successfully Updated'});
          })
          .catch(err => res.status(500).json(err))
    }

    static delete(req, res) {
        Cart.destroy({
            where: {
                UserId: req.params.UserId,
                ProductId: req.params.ProductId
            }
        })
            .then(result => res.status(200).json({msg: 'cart deleted'}))
            .catch(err => res.status(500).json(err))
    }
}

module.exports = UserController