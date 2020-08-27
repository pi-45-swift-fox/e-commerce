const routes = require('express').Router()
const CartController = require('../controllers/CartController.js')
const authenticate = require('../middlewares/authenticate.js')

routes.use(authenticate)
routes.get('/', CartController.getCart)
routes.put('/', CartController.updateCartAndProduct)
routes.post('/product/:id', CartController.addToCart)
routes.patch('/:id/quantity', CartController.updateCart)
routes.patch('/:id/status', CartController.updateCart)

module.exports = routes