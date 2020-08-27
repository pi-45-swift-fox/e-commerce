const router = require('express').Router()
const AdminController = require('../controllers/AdminController')

router.post('/login', AdminController.login)

module.exports = router