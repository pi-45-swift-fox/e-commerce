const router = require('express').Router()
const CartController = require('../controllers/CartController')
const Middleware = require('../middleware/Middleware')


router.use(Middleware.authentication)
router.post('/', CartController.add)
router.get('/', CartController.show)
router.patch('/:id/qtyInc', CartController.qtyIncrement)
router.patch('/:id/qtyDec', CartController.qtyDecrement)
router.delete('/:id/:ProductId', CartController.delete)

module.exports = router
