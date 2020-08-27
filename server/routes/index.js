const route = require('express').Router()
const UserRoute = require('./userRoute')
const ProductRoute = require('./productRoute')

route.get('/', function(req, res) {
    res.status(200).json({ msg: 'welcome heroku' })
})

route.use('/products', ProductRoute)
route.use('/', UserRoute)

module.exports = route