const router = require('express').Router();
const { ProductController } = require('../controllers');
const Check = require('../middlewares/user');

router.get('/', ProductController.getProducts);
router.post('/', Check.Authenticate, Check.authorize_admin, ProductController.addProduct);
router.get('/:id', ProductController.detailProduct);
router.delete('/:id', Check.Authenticate, Check.authorize_admin, ProductController.delProduct);
router.put('/:id', Check.Authenticate, Check.authorize_admin, ProductController.updateProduct);

module.exports = router;