const routes = require('express').Router()
const UserRoute = require('./UserRoute')
const ProductRoute = require('./ProductRoute')
const CartRoutes = require('./CartRoutes.js')

routes.use('/', UserRoute)

routes.use('/products', ProductRoute)

routes.use('/carts', CartRoutes)

module.exports = routes