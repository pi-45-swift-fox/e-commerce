const router = require('express').Router()
const productRoutes = require('./product')
const UserController = require('../controllers/UserController')



router.post('/login',UserController.login)
router.post('/register',UserController.register)

router.use('/products',productRoutes)


module.exports =  router

