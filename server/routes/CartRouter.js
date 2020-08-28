const route = require('express').Router()
const CartController = require('../Controller/CartController')
const { Authenticate, Authorize } = require('../Middlewares/Auth')

route.use(Authenticate.Authenticate)
route.get('/', Authorize.AuthorizeUser, CartController.show)
route.post('/', Authorize.AuthorizeUser, CartController.add)
route.put('/:id', Authorize.AuthorizeUser, CartController.update)
route.delete('/:id', Authorize.AuthorizeUser, CartController.delete)

module.exports = route