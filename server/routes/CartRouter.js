const route = require('express').Router()
const CartController = require('../Controller/CartController')
const { Authenticate, Authorize } = require('../Middlewares/Auth')

route.use(Authenticate.Authenticate)
route.get('/cart', Authorize.AuthorizeUser, CartController.show)
route.post('/cart', Authorize.AuthorizeUser, CartController.add)
route.put('/cart/:id', Authorize.AuthorizeUser, CartController.update)
route.delete('/cart/:id', Authorize.AuthorizeUser, CartController.delete)

module.exports = route