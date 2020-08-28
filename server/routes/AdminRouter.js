const route = require('express').Router()
const ProductController = require('../Controller/ProductController')
const { Authenticate, Authorize } = require('../Middlewares/Auth')

route.get('/', ProductController.show)
route.use(Authenticate.Authenticate)
route.post('/', Authorize.AuthorizeAdmin, ProductController.add)
route.put('/:id', Authorize.AuthorizeAdmin, ProductController.update)
route.delete('/:id', Authorize.AuthorizeAdmin, ProductController.delete)

module.exports = route