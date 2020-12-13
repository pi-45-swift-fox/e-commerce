const router = require('express').Router()
const productController = require('../controllers/ProductController')
const { authentication, authorization} = require('../middlewares/auth')

router.get('/', productController.show)
router.get('/:id', productController.showById)
router.use(authentication)
router.use(authorization)
router.post('/', productController.add)
router.put('/:id', productController.update)
router.delete('/:id', productController.destroy)

module.exports = router