const router = require('express').Router()
const UserController = require('../controllers/UserController')
const Carts = require('../controllers/CartsController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/carts', authentication, Carts.findAll)
router.post('/carts', authentication, Carts.add)
router.get('/carts/:id', authentication, Carts.findOne)
router.delete('/carts/:id', authentication, Carts.delete)

module.exports = router