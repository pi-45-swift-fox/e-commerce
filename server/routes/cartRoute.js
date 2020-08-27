const router = require('express').Router()
const cartController = require('../controllers/CartController')
const {authentication} = require('../middlewares/auth')

router.use(authentication)
router.get('/', cartController.show)
router.post('/:ProductId', cartController.add)
router.put('/', cartController.update)
router.delete('/', cartController.destroyAll)
router.delete('/:id', cartController.destroy)

module.exports = router