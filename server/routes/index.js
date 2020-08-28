const router = require('express').Router()
const productRoutes = require('./product')
const UserController = require('../controllers/UserController')
const cartRoutes = require('./cart')



router.post('/login',UserController.login)
router.post('/register',UserController.register)

router.use('/products',productRoutes)
router.use('/carts',cartRoutes)

module.exports =  router

