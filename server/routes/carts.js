const router = require('express').Router()
const Carts = require('../controllers/CartsController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', Carts.findAll)
router.post('/', Carts.add)
router.get('/:id', Carts.findOne)
router.delete('/:id', Carts.delete)

module.exports = router