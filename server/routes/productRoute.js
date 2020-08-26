const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Middleware = require('../middleware/Middleware')

router.get('/', ProductController.show)

router.use(Middleware.authentication)
router.use(Middleware.authorization)

router.post('/', ProductController.add)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router
