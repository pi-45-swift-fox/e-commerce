const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authenticate  = require('../middlewares/authenticate')
const { authorization } = require('../middlewares/authorization')

// route.use(authenticate)
console.log('ke route product read');

route.get('/', ProductController.read)
route.post('/', authorization, ProductController.create)
route.put('/:id', authorization, ProductController.update)
route.delete('/:id', authorization, ProductController.delete)


module.exports = route