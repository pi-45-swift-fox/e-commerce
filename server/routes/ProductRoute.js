const routes = require('express').Router()
const ProductController = require('../controllers/ProductController.js')
const Authorization = require('../middlewares/authorization')
const authenticate = require('../middlewares/authenticate.js')

routes.get('/', ProductController.getAllProducts)

routes.use(authenticate)
routes.post('/', Authorization, ProductController.addProduct)

routes.get('/:id', ProductController.getSelectedProduct)
routes.put('/:id', Authorization,ProductController.updateProduct)
routes.delete('/:id', Authorization ,ProductController.deleteProduct)

module.exports = routes