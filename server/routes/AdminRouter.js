const route = require('express').Router()
const ProductController = require('../Controller/ProductController')
const { Authenticate, Authorize } = require('../Middlewares/Auth')

route.get('/products', ProductController.show)
route.use(Authenticate.Authenticate)
route.post('/products', Authorize.AuthorizeAdmin, ProductController.add)
route.put('/products/:id', Authorize.AuthorizeAdmin, ProductController.update)
route.delete('/products/:id', Authorize.AuthorizeAdmin, ProductController.delete)

module.exports = route