const router = require('express').Router()
const CartController = require('../controllers/CartController')
const Auth = require('../middlewares/auth')


router.use(Auth.authentication)
router.post('/',CartController.createCart)
router.get('/',CartController.showCart)

router.put('/:id',Auth.authorizationUser,CartController.editCart)
router.delete('/:id',Auth.authorizationUser,CartController.delCart)


module.exports = router