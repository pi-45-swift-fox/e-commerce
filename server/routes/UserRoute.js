const routes = require('express').Router()
const UserController = require('../controllers/UserController')

routes.post('/login', UserController.login)
routes.post('/register', UserController.register)

module.exports = routes