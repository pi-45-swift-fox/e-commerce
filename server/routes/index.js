const route=require('express').Router()
const ProductController=require('../controller/product-controller')
const UserController = require('../controller/user-controller')
const CartController = require('../controller/cart-controller')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const customerAuthorization = require('../middleware/customer-authorization')

route.get('/cart',authentication,CartController.read)
route.post('/register',UserController.register)
route.post('/login',UserController.login)
route.get('/products',ProductController.read)
route.post('/products',authentication,authorization,ProductController.create)
route.delete('/products/:id',authentication,authorization,ProductController.delete)
route.put('/products/:id',authentication,authorization,ProductController.update)
route.post('/cart/:id',authentication,CartController.add)
route.delete('/cart/:id',authentication,customerAuthorization,CartController.del)
route.put('/cart/:id',authentication,customerAuthorization,CartController.update)


module.exports=route