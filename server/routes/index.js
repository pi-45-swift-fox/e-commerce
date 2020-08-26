const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const carts = require('./carts')
const AdminController = require('../controllers/AdminController')

router.get('/', (err, res) => {
    res.send({ message: 'Connected!' })
})

router.use('/', user)
router.use('/carts', carts)
router.post('/admin-login', AdminController.login)
router.use('/products', product)
module.exports = router