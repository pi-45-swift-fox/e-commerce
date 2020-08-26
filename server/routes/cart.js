const router = require('express').Router();
const { CartController } = require('../controllers');
const Check = require('../middlewares/user');

router.get('/', Check.Authenticate, CartController.list);
router.post('/', Check.Authenticate, CartController.add);
router.patch('/:id', Check.Authenticate, Check.authorize_cart_owner, CartController.update);
router.delete('/:id', Check.Authenticate, Check.authorize_cart_owner, CartController.del);
router.patch('/:id', Check.Authenticate, Check.authorize_cart_owner, CartController.update);
router.get('/buy', Check.Authenticate, CartController.buy);

module.exports = router;