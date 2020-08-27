const router = require('express').Router()
const product = require('./products')
const user = require('./user')
const Admin = require('./admin')
const cart = require('./cart')
router.get('/', (req, res) => {
  res.send('OK')
})
router.use('/', user)
router.use('/products', product)
router.use('/cart',cart)
router.use('/admin', Admin)
module.exports = router