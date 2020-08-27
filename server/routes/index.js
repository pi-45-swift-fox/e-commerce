const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const bannerRoute = require('./bannerProduct')
const cartRoute = require('./cartRoute')

router.use('/', userRoute)
router.use('/products', productRoute)
router.use('/banners', bannerRoute)
router.use('/carts', cartRoute)

module.exports = router 