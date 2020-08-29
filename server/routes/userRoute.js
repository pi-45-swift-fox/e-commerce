const route = require('express').Router()
const UserController = require('../controllers/UserController')
const authenticate  = require('../middlewares/authenticate')
const { authorizationCust } = require('../middlewares/authorization')


// admin & customer login
route.post('/login', UserController.login)

// customer
route.post('/registerCust', UserController.registerCust)

route.use(authenticate)
route.post('/:UserId', authorizationCust, UserController.create)
route.get('/:UserId', authorizationCust, UserController.showCart)
route.put('/:UserId/:ProductId', authorizationCust, UserController.update)
route.delete('/:UserId/:ProductId', authorizationCust, UserController.delete)




module.exports = route