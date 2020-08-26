const route = require('express').Router()
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const cartController = require('../controllers/cartController')
const auth = require('../middlewares/auth')

route.post('/register', userController.register)
route.post('/login', userController.login)

route.get('/products', productController.read)

route.use(auth.authentication)

route.post('/carts', cartController.create )
route.get('/carts', cartController.read)
route.get('/carts/:id', cartController.readOne)
route.put('/carts/:id', cartController.update)
route.delete('/carts/:id', cartController.delete)

route.use(auth.authorization)

route.post('/products', productController.create)
route.get('/products/:id', productController.readOne)
route.put('/products/:id', productController.update)
route.delete('/products/:id', productController.delete)



module.exports = route