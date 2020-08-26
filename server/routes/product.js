const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const adminauthentication = require('../middlewares/adminauthentication')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.post('/', adminauthentication, ProductController.addProduct)
router.put('/:id', adminauthentication, ProductController.editProduct)
router.put('/buy/:id', ProductController.buyProduct)
router.delete('/:id', adminauthentication, ProductController.deleteProduct)

module.exports = router