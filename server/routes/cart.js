const router = require('express').Router()
const CartController = require('../controllers/CartController')

router.post('/',CartController.createCart)
router.get('/',CartController.showCart)
router.put('/',CartController.editCart)


module.exports = router