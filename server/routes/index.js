const router = require('express').Router()
const userRouter = require('./userRoute')
const productRouter = require('./productRoute')
const cartRouter = require('./cartRoute')

router.use('/', userRouter)

router.use('/carts', cartRouter)
router.use('/products', productRouter)

module.exports = router
