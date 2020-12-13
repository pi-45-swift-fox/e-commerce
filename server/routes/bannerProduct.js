const router = require('express').Router()
const bannerController = require('../controllers/BannerController')
const { authentication, authorization} = require('../middlewares/auth')

router.get('/', bannerController.show)
router.get('/:id', bannerController.showById)
router.use(authentication)
router.use(authorization)
router.post('/', bannerController.add)
router.put('/:id', bannerController.update)
router.delete('/:id', bannerController.destroy)

module.exports = router