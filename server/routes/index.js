const router = require('express').Router();
const { UserController } = require('../controllers');
const ProductRoute = require('./product');
const CartRoute = require('./cart');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/products', ProductRoute);
router.use('/cart', CartRoute);
router.get('/say-hi', (req, res) => { res.status(200).json({ hi: 'hello' }) });

module.exports = router;