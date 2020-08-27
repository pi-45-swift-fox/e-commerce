const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const CartController = require('../controllers/CartController')
router.use(authentication)
router.get('/', CartController.findAll)
router.get('/checkout', CartController.showstatus)
router.post('/', CartController.add)
router.get('/:id', CartController.findOne)
router.put('/checkout/:id', CartController.status)
router.put('/edit/:id', authorization, CartController.edit)
router.delete('/delete/:id', CartController.delete)

module.exports = router