const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Auth = require('../middlewares/auth')


router.get('/',ProductController.showAll)
router.get('/banners',ProductController.bannerProduct)


router.use(Auth.authentication)
router.use(Auth.authorizationAdmin)
router.post('/',ProductController.addProduct)
router.put('/:id',ProductController.editProduct)
router.delete('/:id',ProductController.deleteProduct)

module.exports = router